const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("info").setDescription("Hiển thị số bài hát các chú bé đần đã tìm"),
    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Thêm nhạc vào để, chưa có bài nào hết :>>")

        let bar = queue.createProgressBar({
            queue: false,
            length: 19,
        })

        const song = queue.current

        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`Bài hiện tại [${song.title}](${song.url})\n\n` + bar)
            ],
        })
    },
}