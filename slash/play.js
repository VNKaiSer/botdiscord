const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Phát bài hát từ link du túp")
        .addSubcommand((subcommand) =>
            subcommand
            .setName("song")
            .setDescription("Phát một bài hát mà mi cóp ti từ du túp")
            .addStringOption((option) => option.setName("url").setDescription("Link bài hát").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName("playlist")
            .setDescription("Phát môt cái phờ lay dít từ link du túp")
            .addStringOption((option) => option.setName("url").setDescription("Link phờ lay lít url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName("search")
            .setDescription("Tìm bài hát theo từ khúa")
            .addStringOption((option) =>
                option.setName("searchterms").setDescription("Từ khúa").setRequired(true)
            )
        ),
    run: async({ client, interaction }) => {
        if (!interaction.member.voice.channel) return interaction.editReply("Dô phòng ngồi đi chòi oyyyy")

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        const embed = new EmbedBuilder()

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Méo thấy")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed.setDescription(`**[${song.title}](${song.url})** đã được thêm vào hàng chờ`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Thời gian: ${song.duration}` })

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** đã được thêm vào hàng chờ`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({ text: `Thời gian: ${playlist.duration}` })
        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Méo thấy")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** đã được thêm vào hàng chờ`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Thời gian: ${song.duration}` })
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    },
}