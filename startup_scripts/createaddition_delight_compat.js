const $CakeBlock = Java.loadClass('net.minecraft.world.level.block.CakeBlock');

StartupEvents.registry('item', event => {
    event.create('honey_cake_slice').displayName('Slice of Honey Cake').useAnimation('eat').food(food => {
        food.hunger(2)
    });
    event.create('chocolate_cake_slice').displayName('Slice of Chocolate Cake').useAnimation('eat').food(food => {
        food.hunger(2)
    });
});

/**
 * Grab a slice of cake when right clicking the cake with a knife.
 * @param {Internal.PlayerInteractEvent$RightClickBlock} event
 * @param {Internal.ItemStack_} original
 * @param {Internal.ItemStack_} slice
 */
function sliceCake(event, original, slice) {
    if (!event.entity.isPlayer()) {
        return;
    }

    /** @type {Internal.Player} */
    const player = event.entity;
    const toolStack = player.getItemInHand(event.hand);

    if (!toolStack.hasTag('farmersdelight:tools/knives')) {
        return;
    }

    const level = event.level;
    const pos = event.pos;
    const block = level.getBlock(pos);
    const state = block.blockState;

    const bites = state.getValue($CakeBlock.BITES);

    /** @type {Internal.ItemEntity} */
    let itemEntity = level.createEntity('item');
    itemEntity.x = pos.x + (bites * 0.1);
    itemEntity.y = pos.y + 0.2;
    itemEntity.z = pos.z + 0.5;
    itemEntity.setDeltaMovement(new Vec3(-0.05, 0, 0));
    itemEntity.item = slice;
    itemEntity.item.count = 1;
    itemEntity.spawn();

    level.playSound(null, pos, 'block.wool.break', 'players', 0.8, 0.8);

    if (bites < 6) {
        block.set(original, { bites: `${bites + 1}` });
    } else {
        level.removeBlock(pos, false);
    }

    event.setCancellationResult('success');
    event.setCanceled(true);
}

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
    const block = event.level.getBlockState(event.pos);
    if (block.is('createaddition:chocolate_cake')) {
        sliceCake(event, 'createaddition:chocolate_cake', 'kubejs:chocolate_cake_slice');
    }

    if (block.is('createaddition:honey_cake')) {
        sliceCake(event, 'createaddition:honey_cake', 'kubejs:honey_cake_slice');
    }
});