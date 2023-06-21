ServerEvents.recipes((event) => {
    //Add missing cake construction recipe for custom cake slices.
    event.recipes.minecraft.crafting_shapeless('createaddition:chocolate_cake', [
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice',
        'kubejs:chocolate_cake_slice'
    ]);

    event.recipes.minecraft.crafting_shapeless('createaddition:honey_cake', [
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice',
        'kubejs:honey_cake_slice'
    ]);
});