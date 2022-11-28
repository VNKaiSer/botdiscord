const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("pause").setDescription("Dừng bài hát của chú bé đần lại"),
    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("=)) Thêm bài hát vào đi các chú bé đần")

        queue.setPaused(true)
        await interaction.editReply("Nhấn /pause để dừng nhạc")
    },
}