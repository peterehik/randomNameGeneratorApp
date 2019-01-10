vueModel = ''

function initVueModel(people){

    let peopleComponent = {
        props: ['people', 'filter'],
        computed: {
            filteredPeople: function(){
                let result = this.people
                let filter = this.filter
                let props = Object.keys(this.filter)
                props.forEach(prop => {
                    if(!filter[prop])
                        return
                    result = result.filter(p => p[prop].toLocaleLowerCase().indexOf(filter[prop].toLocaleLowerCase()) >= 0)
                })
                return result
            }
        },
        template: `
            <div>
                <table class="table table-bordered table-sm table-hover table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>First Name</th><th>Last Name</th><th>Age</th><th>City</th>
                        </tr>
                        <tr class="filter-container">
                            <td>
                                <input class="filter-box" type="text" v-model="filter.firstName" />
                            </td>
                            <td>
                                <input class="filter-box" type="text" v-model="filter.lastName" />
                            </td>
                            <td>
                                <input class="filter-box" type="text" v-model="filter.age" />
                            </td>
                            <td>
                                <input class="filter-box" type="text" v-model="filter.city" />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in filteredPeople">
                            <td>{{row.firstName}}</td><td>{{row.lastName}}</td><td>{{row.age}}</td><td>{{row.city}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }

    vueModel = new Vue({
        el: '#app',
        components: {
            'people-table': peopleComponent
        },
        data: {
            people: people,
            filter: {
                firstName: 'Peter',
                lastName: '',
                age: '',
                city: ''
            }
        }
    })
}

class PeopleGenerator {

    constructor(){
        this.names = [
            'Peter', 'Sophia', 'Thunder', 'Jacob', 'Dominic', 'Brad', 'Pitt', 'Joseph', 'Princess',  'Gift', 'Shalom',
            'Shelby', 'Matt', 'Adam', 'Steve', 'Stark', 'Jon', 'Sansa', 'Tyrion', 'Francisca'
        ]
        this.ages = Array.from(new Array(50), (x, i)=> 18 + i)
        this.locations = ['Manhattan NY', 'Brooklyn NY', 'Queens NY', 'Long Island NY', 'Staten Islang NY', 'Dallas TX',
        'Houston TX', 'Arlington TX', 'Kansas City, KS', 'Los Angeles CA']
    }

    generatePeople(numPeople){
        this.people = []
        for(let i=0; i < numPeople; i++){
            let [firstName, lastName, age, city] = this.getRandomPersonData()
            this.people.push({
                firstName,
                lastName,
                age: age.toString(),
                city
            })
        }
        return this.people
    }

    getRandomPersonData(){
        return [PeopleGenerator.getRandomElement(this.names), PeopleGenerator.getRandomElement(this.names),
            PeopleGenerator.getRandomElement(this.ages), PeopleGenerator.getRandomElement(this.locations)]
    }

    static getRandomElement(someArray){
        let index =  Math.floor(Math.random() * someArray.length)
        return someArray[index]
    }



}

window.onload = function(){

    initVueModel(new PeopleGenerator().generatePeople(200))
    console.log('Done')
}

