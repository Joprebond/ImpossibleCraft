/* 
  custom eye of ender implementation allowing to find different structures
  authored by EnigmaQuip

  will locate the nearest structure that has the structure tag set
*/

const $EyeofEnder = Java.loadClass(
  "net.minecraft.world.entity.projectile.EyeOfEnder"
);
const $Registry = Java.loadClass("net.minecraft.core.registries.Registries");
const $TagKey = Java.loadClass("net.minecraft.tags.TagKey");

StartupEvents.registry("item", (event) => {

 //Custom Ender Eye
  event
  .create("arcane_eye:arcane_eye")
  .displayName("Arcane Eye")
  .unstackable()
  .use((level, player, interactionHand) => {
    let item = player.getHeldItem(interactionHand);
    player.startUsingItem(interactionHand);
    if (!level.clientSide) {
      let structureTag = $TagKey.create(
        $Registry.STRUCTURE,
        "minecraft:on_trial_chambers_maps"
      );

      let foundPos = level.findNearestMapStructure(
        structureTag,
        player.blockPosition(),
        1000,
        false
      );

      if (foundPos) {
        console.log("Trial chamber found: " + foundPos);
        let eye = new $EyeofEnder(
          level,
          player.getX(),
          player.getY(0.5),
          player.getZ()
        );

        eye.setItem(item);
        eye.signalTo(foundPos);
        eye.spawn();

        level.playSound(
          null,
          player.getX(),
          player.getY(),
          player.getZ(),
          "entity.ender_eye.launch",
          player.getSoundSource(),
          0.5,
          0.5
        );

        player.swing(interactionHand);
        return true;
      }
      else {
        console.log("No trial chamber found", null);
      }
    }
    return false;
  });
});
