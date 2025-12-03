import PocketBase from 'pocketbase';
 
export const serverAddress = '10.20.227.50';
const pb = new PocketBase('http://127.0.0.1:8090');
 
// export {serverAddress}; -> alternative Schreibweise, wenn kein export direkt bei der Variable!
 
export let store = $state({
    rabbits: [],
    listRabbits: async () => {
        store.rabbits = await pb.collection('rabbits').getFullList();
    },
    editRabbit: async (id, newName) => {
        let editedRabbit = {
            name: newName
        };
        try {
            const response = await fetch(`http://${serverAddress}:7070/rabbits/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedRabbit)
            });
            if (!response.ok) {
                alert(await response.text());
            }
        } catch (error) {
            console.log('FEHLER');
        }
        store.listRabbits();
    },
    deleteRabbit: async function (id) {
        const response = await fetch('http://' + serverAddress + ':7070/rabbits/' + id, {
            method: 'DELETE'
        });
        store.listRabbits();
    },
    addRabbit: async (name) => {
        let newRabbit = {
            name: name
        };
        try {
            const response = await pb.collection('rabbits').create({name : name})
            if (!response.ok) {
                alert(await response.text());
            }
        } catch (error) {
            console.log('FEHLER');
        }
        store.listRabbits();
    }
});
 