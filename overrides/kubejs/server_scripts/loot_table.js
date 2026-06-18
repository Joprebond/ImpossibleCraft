
// BLOCKS (~60%) — weight 12 each + nylium at 2 each = 64 total
const piglinBlocks = [
    [ "minecraft:netherrack",        12, [16, 32] ],
    [ "minecraft:obsidian",          12, [ 2,  4] ],
    [ "minecraft:crying_obsidian",   12, [ 2,  4] ],
    [ "minecraft:blackstone",        12, [ 8, 16] ],
    [ "minecraft:soul_sand",         12, [ 8, 16] ],
    [ "minecraft:crimson_nylium",     2, [ 8, 16] ],
    [ "minecraft:warped_nylium",      2, [ 8, 16] ],
];

// PRECIOUS (~28%) — weights sum to 30
const piglinPrecious = [
    [ "minecraft:leather",            8, [ 2,  4] ],
    [ "minecraft:quartz",             8, [ 5, 12] ],
    [ "minecraft:ender_pearl",        7, [ 1,  2] ],
    [ "minecraft:netherite_scrap",    7, [ 1,  2] ],
];

// ENCHANTS (~11%) — 4 books at weight 3 each = 12 total (equal distribution)
const piglinEnchantedBooks = [
    LootEntry.of("minecraft:enchanted_book")
             .withWeight(3)
             .enchant(builder => { builder.withEnchantment("minecraft:mending", 1); }),
    LootEntry.of("minecraft:enchanted_book")
             .withWeight(3)
             .enchant(builder => { builder.withEnchantment("minecraft:unbreaking", [1, 2]); }),
    LootEntry.of("minecraft:enchanted_book")
             .withWeight(3)
             .enchant(builder => { builder.withEnchantment("minecraft:protection", 1); }),
    LootEntry.of("minecraft:enchanted_book")
             .withWeight(3)
             .enchant(builder => { builder.withEnchantment("minecraft:soul_speed", [1, 2]); }),
];



LootJS.lootTables(event => {
    let table = event.getLootTable("minecraft:gameplay/piglin_bartering")
    table.clear()
    table.createPool(pool => {
        piglinBlocks.forEach(([itemID, weight, [min, max]]) => {
            pool.addEntry(LootEntry.of(itemID).setCount([min, max]).withWeight(weight));
        });

        piglinPrecious.forEach(([itemID, weight, [min, max]]) => {
            pool.addEntry(LootEntry.of(itemID).setCount([min, max]).withWeight(weight));
        });

        piglinEnchantedBooks.forEach(lootItem => {
            pool.addEntry(lootItem);
        });
    });
});
