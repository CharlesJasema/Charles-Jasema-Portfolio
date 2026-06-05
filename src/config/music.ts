/**
 * Music Portfolio Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your music catalog
 * All music content and streaming links are managed here.
 */

export const musicConfig = {
  // Artist Information
  artist: {
    name: 'Charles Jasema',
    genre: 'Contemporary Gospel',
    description: 'Purpose-driven worship leader and songwriter creating music that inspires faith, hope, and spiritual transformation.',
    totalSongs: 14,
    totalVideos: 2,
    totalLyricalVideos: 14,
  },

  // Streaming Platform Links
  platforms: {
    mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema',
    youtube: 'https://www.youtube.com/@CharlesJasemaMusic',
    spotify: 'https://open.spotify.com/artist/charles-jasema', // To be updated when available
    appleMuic: '', // To be updated when available
  },

  // Featured Songs Collection
  songs: [
    {
      id: 'a-call-to-build-for-restoration',
      title: 'A Call to Build for Restoration',
      genre: 'Contemporary Gospel',
      releaseYear: 2025,
      duration: '4:32', // To be updated with actual duration
      description: 'An inspiring and faith-filled anthem that challenges believers and communities to respond to God\'s invitation to bring hope, healing, and restoration to a broken world.',
      themes: [
        'Restoration and healing',
        'Unity and community building', 
        'Faith in action',
        'Compassion and service',
        'Hope for the broken',
        'God\'s grace and reconciliation'
      ],
      keyScripture: 'Isaiah 58:12',
      scriptureText: 'Your people will rebuild the ancient ruins and will raise up the age-old foundations; you will be called Repairer of Broken Walls, Restorer of Streets with Dwellings.',
      links: {
        youtube: 'https://youtu.be/93aDMyV9cxs',
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-3487886'
      },
      lyrics: {
        verse1: 'We hear the cry, the broken call, A world in need, a heart for all. Hands to heal, love to restore, Let\'s rise together, do much more.',
        preChorus: 'Restoration\'s calling everywhere.',
        chorus: 'A call to build, to stand as one, With faith and hope, the work\'s begun. Through grace we\'ll mend, through love we\'ll share, Restoration\'s calling everywhere.',
        bridge: 'Let\'s rise to build, restore the pain, Together we\'ll bring peace again.'
      },
      featured: true,
      order: 1
    },
    {
      id: 'jesus-you-are-lord',
      title: 'Jesus You Are Lord',
      genre: 'Contemporary Gospel',
      releaseYear: 2015,
      duration: '3:45', // To be updated with actual duration
      description: 'A heartfelt worship and declaration song that acknowledges the supreme authority, wisdom, and lordship of Jesus Christ over every aspect of life.',
      themes: [
        'The Lordship of Jesus Christ',
        'Identity in Christ',
        'Trust in God\'s wisdom',
        'Divine purpose and destiny',
        'Faith and surrender',
        'God\'s knowledge of our lives',
        'Confidence beyond human opinions'
      ],
      keyScripture: 'Jeremiah 1:5',
      scriptureText: 'Before I formed you in the womb I knew you, before you were born I set you apart.',
      links: {
        youtube: '', // To be provided
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-1377029'
      },
      lyrics: {
        chorus: 'Jesus you are Lord, Jesus you are Lord; You have the answer, To explain my life.',
        verse1: 'Even though my father says, He knows more about me; But Jesus you are Lord, To explain my life.'
      },
      featured: true,
      order: 2
    },
    {
      id: 'mercy',
      title: 'Mercy',
      genre: 'Contemporary Gospel',
      releaseYear: 2024,
      duration: '4:18', // To be updated with actual duration
      description: 'A deeply reflective contemporary gospel song inspired by the heartfelt prayer of repentance found in Psalm 51, taking listeners on a spiritual journey from sinfulness to God\'s transforming grace.',
      themes: [
        'Repentance and confession',
        'God\'s mercy and forgiveness',
        'Redemption through grace',
        'Human sinfulness and restoration',
        'Spiritual renewal',
        'God\'s unfailing love',
        'Hope for the broken and fallen'
      ],
      keyScripture: 'Psalm 51:1',
      scriptureText: 'Have mercy on me, O God, according to your unfailing love; according to your great compassion blot out my transgressions.',
      links: {
        youtube: 'https://youtu.be/RGBrDsyTMB0',
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-3206464'
      },
      lyrics: {
        verse1: 'In the heart of darkness, I once did reside, A sinner lost in shadows, with nowhere to hide. But Psalm 51:5 spoke truth to my soul, "I was brought forth in iniquity," made me whole.',
        chorus: 'Have mercy on me O-Lord, According to your unfailing love; For I know, my sin, Is forever, before me.'
      },
      featured: true,
      order: 3
    },
    {
      id: 'my-help-comes-from-you',
      title: 'My Help Comes From You',
      genre: 'Contemporary Gospel',
      releaseYear: 2025,
      duration: '4:05', // To be updated with actual duration
      description: 'A powerful contemporary gospel worship song inspired by the timeless promises of Psalm 121, declaring trust in God as the ultimate source of help, protection, guidance, and strength.',
      themes: [
        'Trust in God',
        'Divine help and provision',
        'God\'s protection and preservation',
        'Faith during difficult seasons',
        'God\'s faithfulness',
        'Hope and encouragement',
        'Worship and dependence on God'
      ],
      keyScripture: 'Psalm 121:1-2',
      scriptureText: 'I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.',
      links: {
        youtube: 'https://youtu.be/hGJjMPXc544',
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-5021539'
      },
      lyrics: {
        verse1: 'I lift my eyes to the hills so high, Where does my help come from tonight? Not from the mountains, not from the seas, My help comes from the Maker of all things.',
        chorus: 'My help comes from You, Lord, Creator of the earth, You won\'t let me stumble; You hold my worth. You\'re my shade by day, my light in the night, My help comes from You; You\'re my guiding light.'
      },
      featured: true,
      order: 4
    },
    {
      id: 'i-dont-belong-here',
      title: 'I Don\'t Belong Here',
      genre: 'Contemporary Gospel',
      releaseYear: 2023,
      duration: '3:52', // To be updated with actual duration
      description: 'A powerful contemporary gospel song that celebrates the transforming power of salvation through Jesus Christ, declaring a believer\'s new identity in Christ.',
      themes: [
        'New life in Christ',
        'Salvation and transformation',
        'Christian identity',
        'Separation from worldly ways',
        'Discipleship and obedience',
        'Evangelism and personal testimony',
        'Eternal hope in Christ'
      ],
      keyScripture: '2 Corinthians 5:17',
      scriptureText: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
      links: {
        youtube: 'https://youtu.be/5LJ2kqwd5jM',
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-2013443'
      },
      lyrics: {
        chorus: 'I don\'t belong here now Coz I am a new creature, Oh! In Jesus Christ. I don\'t do that now Coz I am a new creature, Oh! In Jesus Christ.',
        verse1: 'Sister I\'m sorry I can\'t do that now, oh! Brother I don\'t need that anymore, hmm! Coz I\'ve already changed my mind, To follow Jesus, and do the right thing.'
      },
      featured: true,
      order: 5
    },
    {
      id: 'nyadru-love',
      title: 'Nyadru – Love',
      genre: 'Contemporary Gospel',
      releaseYear: 2021,
      duration: '4:15', // To be updated with actual duration
      description: 'An uplifting contemporary gospel song that celebrates love as the greatest virtue and the foundation of peaceful relationships, unity, and harmonious living. "Nyadru" means "Love" and serves as a universal language that transcends differences.',
      themes: [
        'God\'s unfailing love',
        'Loving one another',
        'Unity and harmony',
        'Peaceful coexistence',
        'Compassion and kindness',
        'Christian living',
        'Joy through love',
        'Love in action'
      ],
      keyScripture: 'John 13:34-35',
      scriptureText: 'A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.',
      links: {
        youtube: '', // To be provided
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-2013440'
      },
      lyrics: {
        intro: 'It\'s all about Love that I\'m talking about now. Yeah, Charles Jasema.',
        verse1: 'As long as you want to live, you must know one language Nyadru – Love… The language of peace, the language of unity, harmony is… ..Nyadru – Love…',
        chorus: 'I know, your Unfailing Love can\'t be compared I know oh, your Unfailing Love can\'t be compared Oh… !!! Oh… !!!',
        verse2: 'Remember how Christ emphasized Love in the Bible That we should love one another, like the way we love ourselves. That\'s right, I know that… But we\'re not putting it into action, yeah!',
        outro: 'More Joy comes when there\'s Love Coz it\'s the most great thing above all When love becomes your priority, In your life, it\'s amazing thing…'
      },
      featured: true,
      order: 6
    },
    {
      id: 'where-will-you-be',
      title: 'Where Will You Be?',
      genre: 'Contemporary Gospel',
      releaseYear: 2025,
      duration: '4:28', // To be updated with actual duration
      description: 'A thought-provoking contemporary gospel song that challenges listeners to reflect on one of life\'s most important questions: Where will you spend eternity? A powerful call to self-examination, repentance, and readiness for the day when every person will stand before God.',
      themes: [
        'Eternal destiny',
        'Salvation through Jesus Christ',
        'Repentance and self-examination',
        'Readiness for eternity',
        'God\'s grace and mercy',
        'Christian accountability',
        'Living with purpose',
        'The reality of Heaven and Hell'
      ],
      keyScripture: 'Hebrews 9:27',
      scriptureText: 'Just as people are destined to die once, and after that to face judgment.',
      links: {
        youtube: 'https://youtu.be/h92v-RDVJds',
        mdundo: 'https://play.mdundo.com/artist/148492/Charles-Jasema#autoplay-4870400'
      },
      lyrics: {
        chorus: 'Today, today (Tell me) Today, (Where will you be) Today, (If you die) Reflect, reflect (On your life) Reflect, (Before it\'s too late) Reflect, (The choice is yours)',
        verse1: 'Where will you go? (Today) If your time has come! (Today) Will you stand before? (The LORD) Or face eternal gloom? Have you lived for Him, in all that you do?',
        verse2: 'Have you showed Love and Grace to those in need? Have you followed His path, in Word and in Deed? Don\'t wait until tomorrow, for the time may run out!',
        bridge: 'Don\'t let the world, distract you oh, From the truth that\'s clear, seek His face. His arms are open wide, Waiting to receive you; But the choice is yours, To make…'
      },
      featured: true,
      order: 7
    }
  ],

  // Ministry Performance Images
  performances: {
    liveWorship: '/images/charles-jasema-live-worship-performance.jpg',
    youthMinistry: '/images/charles-jasema-youth-ministry.jpg',
    graduationCeremony: '/images/charles-jasema-graduation-ceremony.jpg',
    communityOutreach: '/images/charles-jasema-community-outreach.jpg',
    churchService: '/images/charles-jasema-church-service.jpg'
  },

  // Artist Statement
  artistMessage: "Music has always been my way of connecting hearts to God's love and truth. Each song I write comes from personal encounters with God's Word and real-life experiences of His faithfulness. My prayer is that through these songs, listeners will find hope, encouragement, and a deeper relationship with Jesus Christ. Whether in times of joy or difficulty, may these melodies remind us that God is always present, always loving, and always faithful.",

  // Ministry Stats
  stats: {
    songsReleased: 14,
    videosProduced: 2,
    lyricalVideos: 14,
    yearsInMinistry: 10,
    platformsAvailable: 3,
    averageMonthlyListeners: '2.5K+' // To be updated with actual stats
  }
} as const;

export type MusicConfig = typeof musicConfig;
export type Song = typeof musicConfig.songs[number];