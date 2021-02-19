Practice your query syntax using GraphiQL to get a feel for how schemas are set up in GraphQL. For problems that accept variables make sure to test each answer you come up with with multiple `id`s to make sure they work.

1. Write a query that will return the name, founder, ghost, and animal of Gryffindor (id: 1) and Ravenclaw (id: 4). Remember to alias - then DRY up your query with a fragment!
fragment findHouse on House {
    name,
    founder,
    ghost,
    animal
}

{
	Gryffindor: house(id: 1){
  	...findHouse
	}
  Ravenclaw: house(id: 4){
		...findHouse
  }
}
2. Write a query that will return the core, length, owner name, and the name of the owner's house for both the wand with the `id` of 7 and the wand with the `id` of 10. Then use a fragment to DRY it up!
fragment findWizardAndHouseForWand on Wand {
  core,
  length,
  wizard {
    name
    house {
      name
    }
  }
}

{
	Gryffindor: wand(id: 1){
  	...findWizardAndHouseForWand
	}
  Ravenclaw: wand(id: 4){
		...findWizardAndHouseForWand
  }
}
3. Create a query that will accept an `id` variable and will return the patronus form associated with that `id`.
query FormForPatronus($id: Int){
	patronus(id: $id) {
  	form
	}
}

{
  "id": 5
}
4. Write a query with the operation name of `FetchWizardandWand` that will accept two variables, one for a wizard to be fetched(`$wizardId`) and one for a wand to be fetched(`$wandId`). For the wizard return their name and house name. For the wand return the core, length, and the wizard's patronus form.
query FetchWizardandWand($wizardId: Int, $wandId: Int){
	wizard(id: $wizardId) {
    name,
    house {
      name
    }
  },
  wand(id: $wandId) {
    core,
    length
    wizard {
      patronus {
        form
      }
    }
  }
}

{
  "wizardId": 5,
  "wandId": 1
}
5. Now let's use variables, aliases and fragments! Write a query that will accept the `id` of two patronus. For each patronus return the form of that patronus, along with the name of the wizard that patronus belongs to.
fragment findPatronus on Patronus {
  form
  wizards {
    name
  }
}

query FetchPatronus($patronus_1_Id: Int, $patronus_2_Id: Int){
	patronus_1: patronus(id: $patronus_1_Id) {
    ...findPatronus
  },
  patronus_2: patronus(id: $patronus_2_Id) {
    ...findPatronus
  }
}

{
 	"patronus_1_Id": 1,
	"patronus_2_Id": 2
}
6. Write a query that accepts two variables for the `id`s of two houses. For each house return the names of all the wizards of that house along with the core of their wands and their patronus forms. Use a fragment!
fragment findWizardsForHouseIncludeWandsAndAPatronus on House {
	name,
  wizards {
    name
    wands {
      core
    },
    patronus {
      form
    }
  }
}

query FetchPatronus($house_1_Id: Int, $house_2_Id: Int){
	house_1: house(id: $house_1_Id) {
    ...findWizardsForHouseIncludeWandsAndAPatronus
  },
  house_2: house(id: $house_2_Id) {
    ...findWizardsForHouseIncludeWandsAndAPatronus
  }
}


{
 	"house_1_Id": 1,
	"house_2_Id": 2
}
7. Write a query that accepts three variables for the `id` for three separate wizards. For the first wizard return their name, house name and patronus form. For the second wizard return their name, their house name, and their wand core. For the third wizard return their name, their house name, their patronus form, and their wand core. Though you are returning different information for each wizard you are still returning the name and house name of each wizard meaning you could use a fragment to DRY this up!

fragment findWizardNameAndHouseName  on Wizard {
  name,
  house {
    name
  }
}

query FetchPatronus($wizard_1_Id: Int, $wizard_2_Id: Int, $wizard_3_Id: Int){
	wizard_1: wizard(id: $wizard_1_Id) {
    ...findWizardNameAndHouseName,
    patronus {
      form
    }
  },
  wizard_2: wizard(id: $wizard_2_Id) {
    ...findWizardNameAndHouseName,
    wands {
      core
    }
  },
  wizard_3: wizard(id: $wizard_3_Id) {
    ...findWizardNameAndHouseName,
    patronus {
      form
    },
    wands {
      core
    }
  }
}

{
 	"wizard_1_Id": 1,
	"wizard_2_Id": 2,
  "wizard_3_Id": 3
}
8. Write a query that will accept three variables for a query that can be broken down into three parts. The first variable will be the `id` for a house where you will return the name, founder, and patronus forms of all the wizards in that house. The second variable will be to fetch the length of a particular wand. The third variable will query to find the name, and the patronus form for the wizard with the specified id.

query FetchPatronus($house_Id: Int, $wand_Id: Int, $wizard_Id: Int){
	house(id: $house_Id) {
    name,
    founder,
    wizards {
      name,
      patronus {
        form
      }
    }
  },
  wand(id: $wand_Id) {
    length
  },
  wizard(id: $wizard_Id) {
    name,
    patronus {
      form
    }  
  }
}

{
 	"house_Id": 1,
	"wand_Id": 2,
  "wizard_Id": 3
}

