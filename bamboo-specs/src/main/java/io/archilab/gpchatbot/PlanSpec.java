package io.archilab.gpchatbot;

import com.atlassian.bamboo.specs.api.BambooSpec;
import com.atlassian.bamboo.specs.api.builders.BambooKey;
import com.atlassian.bamboo.specs.api.builders.Variable;
import com.atlassian.bamboo.specs.api.builders.deployment.Deployment;
import com.atlassian.bamboo.specs.api.builders.deployment.Environment;
import com.atlassian.bamboo.specs.api.builders.deployment.ReleaseNaming;
import com.atlassian.bamboo.specs.api.builders.permission.DeploymentPermissions;
import com.atlassian.bamboo.specs.api.builders.permission.EnvironmentPermissions;
import com.atlassian.bamboo.specs.api.builders.permission.PermissionType;
import com.atlassian.bamboo.specs.api.builders.permission.Permissions;
import com.atlassian.bamboo.specs.api.builders.permission.PlanPermissions;
import com.atlassian.bamboo.specs.api.builders.plan.Job;
import com.atlassian.bamboo.specs.api.builders.plan.Plan;
import com.atlassian.bamboo.specs.api.builders.plan.PlanIdentifier;
import com.atlassian.bamboo.specs.api.builders.plan.Stage;
import com.atlassian.bamboo.specs.api.builders.plan.artifact.Artifact;
import com.atlassian.bamboo.specs.api.builders.plan.branches.BranchCleanup;
import com.atlassian.bamboo.specs.api.builders.plan.branches.PlanBranchManagement;
import com.atlassian.bamboo.specs.api.builders.plan.configuration.ConcurrentBuilds;
import com.atlassian.bamboo.specs.api.builders.project.Project;
import com.atlassian.bamboo.specs.api.builders.requirement.Requirement;
import com.atlassian.bamboo.specs.builders.task.ArtifactDownloaderTask;
import com.atlassian.bamboo.specs.builders.task.CheckoutItem;
import com.atlassian.bamboo.specs.builders.task.CleanWorkingDirectoryTask;
import com.atlassian.bamboo.specs.builders.task.DockerBuildImageTask;
import com.atlassian.bamboo.specs.builders.task.DockerPushImageTask;
import com.atlassian.bamboo.specs.builders.task.DownloadItem;
import com.atlassian.bamboo.specs.builders.task.InjectVariablesTask;
import com.atlassian.bamboo.specs.builders.task.ScriptTask;
import com.atlassian.bamboo.specs.builders.task.VcsCheckoutTask;
import com.atlassian.bamboo.specs.builders.trigger.AfterSuccessfulBuildPlanTrigger;
import com.atlassian.bamboo.specs.builders.trigger.BitbucketServerTrigger;
import com.atlassian.bamboo.specs.model.task.InjectVariablesScope;
import com.atlassian.bamboo.specs.util.BambooServer;


@BambooSpec
public class PlanSpec {

  public Plan plan() {
    final Plan plan = new Plan(new Project().key(new BambooKey("CHAT")).name("Chatbot"),
        "webchat", new BambooKey("WEB"))
        .pluginConfigurations(new ConcurrentBuilds()
            .useSystemWideDefault(false))
        .stages(new Stage("Default Stage")
            .jobs(new Job("Default Job", new BambooKey("JOB1"))
                .artifacts(new Artifact().name("docker-compose-prod")
                    .copyPattern("docker-compose.prod.yaml")
                    .location("./docker").shared(true).required(true),
                  new Artifact().name("docker-compose-prod")
                    .copyPattern("docker-compose.trainer.yaml")
                    .location("./docker").shared(true).required(true),
                  new Artifact().name("docker-compose")
                    .copyPattern("docker-compose.yaml")
                    .location("./docker").shared(true).required(true))
                .tasks(new VcsCheckoutTask()
                        .description("Checkout the repository")
                        .checkoutItems(
                            new CheckoutItem().defaultRepository()),
                    new ScriptTask()
                        .description(
                            "Create commit hash variable file")
                        .inlineBody(
                            "echo \"commit-hash=$(date +%s%N)\" > ./commit-hash"),
                    new InjectVariablesTask()
                        .description(
                            "Inject the commit hash variable")
                        .path("./commit-hash").namespace("inject")
                        .scope(InjectVariablesScope.RESULT),
                    new DockerBuildImageTask()
                        .description("Build the Docker image")
                        .imageName(
                            "docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat")
                        .useCache(true).dockerfileInWorkingDir(),
                    new ScriptTask().description(
                        "Tag the Docker image with commit hash")
                        .inlineBody(
                            "docker tag docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat:${bamboo.inject.commit-hash}"),
                    new DockerPushImageTask().customRegistryImage(
                        "docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat")
                        .defaultAuthentication(),
                    new DockerPushImageTask().customRegistryImage(
                        "docker.nexus.gpchatbot.archi-lab.io/chatbot/webchat:${bamboo.inject.commit-hash}")
                        .defaultAuthentication(),
                    new ScriptTask().description(
                        "Remove old images from Nexus Docker repository")
                        .inlineBody(
                            "echo \"# Nexus Credentials\\nnexus_host = \\\"https://nexus.gpchatbot.archi-lab.io\\\"\\nnexus_username = \\\"bamboo\\\"\\nnexus_password = \\\"gpchatbot\\\"\\nnexus_repository = \\\"docker-hosted\\\"\" > .credentials\nnexus-cli image delete -name chatbot/webchat -keep 21"))
                .requirements(new Requirement(
                    "system.builder.command.nexus-cli"))))
        .linkedRepositories("chatbot-webchat (master)")

        .triggers(new BitbucketServerTrigger())
        .planBranchManagement(new PlanBranchManagement().delete(new BranchCleanup())
            .notificationForCommitters());
    return plan;
  }

  public PlanPermissions planPermission() {
    final PlanPermissions planPermission =
        new PlanPermissions(new PlanIdentifier("CHAT", "WEB")).permissions(new Permissions()
            .userPermissions("bamboo", PermissionType.ADMIN, PermissionType.VIEW,
                PermissionType.CLONE, PermissionType.BUILD, PermissionType.EDIT)
            .loggedInUserPermissions(PermissionType.VIEW)
            .anonymousUserPermissionView());
    return planPermission;
  }

  public Deployment deployment() {
    final Deployment deployment = new Deployment(new PlanIdentifier("CHAT", "WEB"),
        "webchat-deployment")
        .releaseNaming(new ReleaseNaming("release-46")
            .autoIncrement(true))
        .environments(new Environment("Production")
            .tasks(new CleanWorkingDirectoryTask(),
                new ArtifactDownloaderTask()
                    .description("Download release contents")
                    .artifacts(new DownloadItem()
                        .allArtifacts(true)
                        .path("./artifacts")),
                new ScriptTask()
                    .inlineBody(
                        "eval $(docker-machine env gpchatbotprod)\ndocker stack deploy --with-registry-auth \\\n  -c ./artifacts/docker-compose.yaml \\\n  -c ./artifacts/docker-compose.prod.yaml \\\n  webchat"),
                new ScriptTask()
                    .inlineBody(
                        "eval $(docker-machine env gpchatbotprod)\ndocker stack deploy --with-registry-auth \\\n  -c ./artifacts/docker-compose.yaml \\\n  -c ./artifacts/docker-compose.trainer.yaml \\\n  webchat"))
            .triggers(new AfterSuccessfulBuildPlanTrigger())
            .variables(new Variable("tag",
                "${bamboo.inject.commit-hash}")));
    return deployment;
  }

  public DeploymentPermissions deploymentPermission() {
    final DeploymentPermissions deploymentPermission = new DeploymentPermissions(
        "webchat-deployment")
        .permissions(new Permissions()
            .userPermissions("bamboo", PermissionType.EDIT, PermissionType.VIEW)
            .loggedInUserPermissions(PermissionType.VIEW)
            .anonymousUserPermissionView());
    return deploymentPermission;
  }

  public EnvironmentPermissions environmentPermission1() {
    final EnvironmentPermissions environmentPermission1 = new EnvironmentPermissions(
        "webchat-deployment")
        .environmentName("Production")
        .permissions(new Permissions()
            .userPermissions("bamboo", PermissionType.EDIT, PermissionType.VIEW,
                PermissionType.BUILD)
            .loggedInUserPermissions(PermissionType.VIEW)
            .anonymousUserPermissionView());
    return environmentPermission1;
  }

  public static void main(String... argv) {
    // By default credentials are read from the '.credentials' file.
    BambooServer bambooServer = new BambooServer("https://bamboo.gpchatbot.archi-lab.io");
    final PlanSpec planSpec = new PlanSpec();

    final Plan plan = planSpec.plan();
    bambooServer.publish(plan);

    final PlanPermissions planPermission = planSpec.planPermission();
    bambooServer.publish(planPermission);

    final Deployment deployment = planSpec.deployment();
    bambooServer.publish(deployment);

    final DeploymentPermissions deploymentPermission = planSpec.deploymentPermission();
    bambooServer.publish(deploymentPermission);

    final EnvironmentPermissions environmentPermission1 = planSpec.environmentPermission1();
    bambooServer.publish(environmentPermission1);
  }
}
