const { SlashCommandBuilder } = require("@discordjs/builders")
const { Message } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("hello").setDescription("Hữu Hiệu ciute chào mọi người"),
    run: async({ client, interaction }) => {
        return await interaction.editReply("Hữu Hiệu Cute Tới Đâyy :>>>")
    },
}