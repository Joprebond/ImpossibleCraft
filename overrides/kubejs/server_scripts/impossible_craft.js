RecipeViewerEvents.removeEntriesCompletely('item', event => {
	event.remove('sophisticatedbackpacks:smelting_upgrade');
    event.remove('sophisticatedbackpacks:auto_smelting_upgrade');
    event.remove('sophisticatedbackpacks:stonecutter_upgrade');
    event.remove('sophisticatedbackpacks:smoking_upgrade');
    event.remove('sophisticatedbackpacks:auto_smoking_upgrade');
    event.remove('sophisticatedbackpacks:crafting_upgrade');
    event.remove('sophisticatedbackpacks:feeding_upgrade');
    event.remove('sophisticatedbackpacks:battery_upgrade');
    event.remove('sophisticatedbackpacks:blasting_upgrade');
    event.remove('sophisticatedbackpacks:auto_blasting_upgrade');
    event.remove('sophisticatedbackpacks:advanced_feeding_upgrade');
    event.remove('sophisticatedbackpacks:tool_swapper_upgrade');
    event.remove('sophisticatedbackpacks:advanced_tool_swapper_upgrade');
});


RecipeViewerEvents.removeRecipes(event => {
	event.remove('sophisticatedbackpacks:smelting_upgrade');
    event.remove('sophisticatedbackpacks:auto_smelting_upgrade');
    event.remove('sophisticatedbackpacks:stonecutter_upgrade');
    event.remove('sophisticatedbackpacks:smoking_upgrade');
    event.remove('sophisticatedbackpacks:auto_smoking_upgrade');
    event.remove('sophisticatedbackpacks:crafting_upgrade');
    event.remove('sophisticatedbackpacks:feeding_upgrade');
    event.remove('sophisticatedbackpacks:battery_upgrade');
    event.remove('sophisticatedbackpacks:blasting_upgrade');
    event.remove('sophisticatedbackpacks:auto_blasting_upgrade');
    event.remove('sophisticatedbackpacks:advanced_feeding_upgrade');
    event.remove('sophisticatedbackpacks:tool_swapper_upgrade');
    event.remove('sophisticatedbackpacks:advanced_tool_swapper_upgrade');
});


ServerEvents.tags('block', event => {

    event.add('ftbultimine:excluded_blocks', '#c:ores/iron');
    event.add('ftbultimine:excluded_blocks', '#c:ores/coal');
    event.add('ftbultimine:excluded_blocks', '#c:ores/diamond')
    event.add('ftbultimine:excluded_blocks', 'minecraft:obsidian')
});

ServerEvents.recipes(event => {
    event.remove({output: 'sophisticatedbackpacks:smelting_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:auto_smelting_upgrade'})
    event.remove({output: 'sophisticatedbackpacks:smoking_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:stonecutter_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:auto_smoking_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:crafting_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:feeding_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:battery_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:blasting_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:auto_blasting_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:advanced_feeding_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:tool_swapper_upgrade'});
    event.remove({output: 'sophisticatedbackpacks:advanced_tool_swapper_upgrade'});
    event.remove({output: 'structurecompass:structure_compass'})
    event.remove({output: 'croptopia:knife'})


    event.shaped('easy_mob_farm:creative_speed_enhancement',
        [
            'SSS',
            'STS',
            'SSS',
        ],
        {
            S: 'easy_mob_farm:speed_enhancement',
            T: 'minecraft:nether_star'
        }
    )

    event.shaped('easy_mob_farm:creative_mob_farm',
        [
            'FFF',
            'FTF',
            'FFF'
        ],
        {
            F: 'easy_mob_farm:tier3_mob_farm_template',
            T: 'minecraft:nether_star'
        }
    )
 
    event.shaped('arcane_eye:arcane_eye', 
        [
            ' C ',
            'CMC',
            ' O '
        ],
        {
            C: '#c:ingots/copper',
            M: 'minecraft:compass',
            O: 'minecraft:oxidized_copper',
        }
    )

    event.smithing(
        'structurecompass:structure_compass',
        'minecraft:netherite_upgrade_smithing_template',
        'minecraft:compass',
        'minecraft:netherite_ingot'
    )


    event.shaped('minecraft:repeater', [
        'R R',
        'SRS',
        'TTT'], {
            R: 'minecraft:redstone',
            S: 'minecraft:stick',
            T: '#c:stones'
        })
  
    event.shapeless(Item.of('minecraft:stick', 16),
        [
            '#minecraft:logs',
            '#minecraft:logs'
        ]
    )

    event.shaped(Item.of('minecraft:chest', 4), [
        'LLL',
        'L L',
        'LLL'], {
            L: '#minecraft:logs'
        })

    event.shaped('minecraft:dispenser', 
        ['ST ',
         'SDT',
         'ST '],
        {
            S: 'minecraft:string',
            T: 'minecraft:stick',
            D: 'minecraft:dropper'
        })

    event.shaped('croptopia:knife', 
        [
            ' C ',
            'S  ',
            '   '
        ],
        {
            S: 'minecraft:stick',
            C: '#c:ingots/copper'
        }
    )


});


