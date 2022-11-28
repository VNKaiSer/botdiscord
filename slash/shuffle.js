const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Trộn bài hát ở hàng chờ"),
    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Thêm bài hát dô đi chòi :'>>")

        queue.shuffle()
        await interaction.editReply(`Hàng chờ ${queue.tracks.length} đã được trộn!`)
    },
}