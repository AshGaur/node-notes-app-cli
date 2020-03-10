const yargs=require('yargs')
const notes=require('./notes.js')

// Create add command.
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command:'list',
    describe:'To list all notes',
    handler:function(argv){
        console.log(notes.loadNotes())
    }
})

yargs.command({
    command:'delete',
    describe:'To delete notes',
    builder:{
        title:{
            describe:'note title to delete',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.delNote(argv.title)
    }
})

yargs.command({
    command:'edit',
    describe:'To update a note',
    builder:{
        title:{
            describe:'Title of the note to be updated',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'New body which has to be written to the note',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.editNote(argv.title,argv.body)
    }
})

yargs.command({
    command:'read',
    describe:'To Read note',
    builder:{
        title:{
            describe:'Note title to read',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.readNote(argv.title)
    }
})

/*const check=function(){
    const n=notes.loadNotes()
    console.log(n)
    while(n.length>0){
    n.splice(0,1)
    console.log('Deleted 1nd position')
    console.log(n)
    }
}
check()*/


yargs.parse()