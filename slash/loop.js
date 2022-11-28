const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("loop").setDescription("Lặp lại các bài hát trong hàng chờ"),
    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("Thêm nhạc vào để, chưa có bài nào hết :>>")

        queue.loop = !queue.loop
        const embed = new Discord.EmbedBuilder()
            .setTitle(`🔁 Loop 🔁`)
            .setDescription(`set loop to ${mode}`)
            .setColor("#FFFF00")
            .setFooter(`Requested by 💎Đạt cute hệt mai que💎 `)

        await interaction.editReply({
            embeds: [embed],
        })
    },

}