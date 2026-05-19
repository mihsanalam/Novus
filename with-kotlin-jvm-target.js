const { withProjectBuildGradle } = require('@expo/config-plugins');

const kotlinJvmTargetBlock = `
subprojects {
  tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach { task ->
    task.kotlinOptions.jvmTarget = '17'
  }
}
`;

module.exports = function withKotlinJvmTarget(config) {
  return withProjectBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes("task.kotlinOptions.jvmTarget = '17'")) {
      config.modResults.contents = `${config.modResults.contents.trim()}${kotlinJvmTargetBlock}`;
    }
    return config;
  });
};
