// module.exports = member => {
    // let guild = member.guild;
    // let serverlogs = member.guild.channels.find('name', 'server-logs')
    // let mainchannel = member.guild.channels.find('name', 'general')
    // if(!serverlogs) return mainchannel.send('Cannot find `server-logs` channel');
    // // const toNewMember = member.guild.member(member.mentions.users.first());
    // // const toNewMemberRole = member.guild.roles.find('name', 'New-Members');

    //     setTimeout(function () {
    //         serverlogs.send(`Welcome ${member.user} as they has just joined the server, Please go to .#rules ! Also, you have been given the \`new member\` role!`)
    //     }, 1000);
    //     // setTimeout(function () {
    //     //     toNewMember.addRole(toNewMemberRole);
    //     // }, 1500);

    // This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {

    const settings = client.config.defaultSettings

    if (settings.welcomeEnabled !== "true") return;

    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user);
    member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);

    let serverMembers = member.guild.roles.find('name', settings.userRole);
    member.addRole(serverMembers)


};