module.exports = {
    name: 'hello',
    description: "this is a hello command, you can say hi to this bot.",
    execute(message,args){
        
            message.channel.send('Hello!');
        
        // if(message.member.roles.cache.has('787166874235437086')){
        // }
        // else{
            // message.channel.send('You cannot send this command because you do not have the permission.');
            
            //add role, catch error maybe with role id.
            // message.member.roles.add('787166874235437086').catch(console.error);
           
            //remove role
            //message.member.roles.remove('787166874235437086');

            //check with specific name, deprecated.
            // message.guild.roles.cache.find(r => r.name == "role")


            /**
             * Check permission
             */
            // if(message.member.permissions.has("DISCORD_FLAG")){ //check online doc for flags
            // }
        // }
    }
}