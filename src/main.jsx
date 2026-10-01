import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Lock,
  Music2,
  Pause,
  Play,
  Sparkles,
  Star,
  Gift,
  Camera,
  Gamepad2,
  Moon,
  Mail,
  FilmIcon
} from 'lucide-react'

import './styles.css'


/* =========================================================
   MEMORIES
========================================================= */

const memories = [
  {
    title: 'When We Were Kids',
    date: 'Long before 18 January 2022',
    text: 'We knew each other when we were kids. Maybe we did not know where life would take us then, but somewhere along the way, our story became ours.',
    emoji: '✦'
  },
  {
    title: '18 January 2022',
    date: '18 January 2022',
    text: 'A date that became a tiny constellation in my life. Whenever I think about us, this date feels like one of those stars that never stops glowing.',
    emoji: '♡'
  },
  {
    title: 'Just Spending Time With You',
    date: 'My favorite kind of memory',
    text: 'Honestly, I do not need some huge plan. Spending time with you is enough. Even the most ordinary moments somehow become my favorite ones.',
    emoji: '☾'
  },
  {
    title: 'Certified Bevdas',
    date: 'An officially unofficial title 🤣',
    text: 'Some couples have matching outfits. We have a certification. Certified Bevdas — and honestly, I would not want it any other way.',
    emoji: '✧'
  }
]


/* =========================================================
   REASONS
========================================================= */

const reasons = [
  'Your hugs. Somehow they make the whole world feel quieter for a moment.',
  'Your protective nature. I notice it, I feel it, and I love you for it more than I probably say.',
  'Your clinginess. Yes, I am calling you out — and yes, secretly I love it. 😂',
  'Because spending time with you never feels like time wasted.',
  'Because you can turn an ordinary moment into a memory I want to keep forever.',
  'Because somewhere between all the chaos, you became my person.',
  'Because you are, apparently, Ajay Devgan. And I have accepted my fate. 🤣',
  'Because I love you more than you think, more than I show you, and more than I could ever explain to the world.'
]


/* =========================================================
   FUTURE
========================================================= */

const future = [
  [
    '✈️',
    'Places we should see',
    'A trip where we get lost, laugh about it, and somehow find our way back.'
  ],
  [
    '🌧️',
    'A rainy day',
    'One of those days where we do absolutely nothing and still have the best time.'
  ],
  [
    '🎬',
    'Movie nights',
    'Too many snacks, questionable movie choices, and probably falling asleep halfway through.'
  ],
  [
    '🌌',
    'A night under the stars',
    'Somewhere quiet, with no rush and nowhere else we need to be.'
  ],
  [
    '🏠',
    'Our little place',
    'A tiny corner of the world that feels like ours.'
  ],
  [
    '📸',
    'More memories',
    'The future version of this app is going to need a lot more photos.'
  ]
]


/* =========================================================
   APP
========================================================= */

function App() {

  const [entered, setEntered] = useState(false)
  const [section, setSection] = useState(null)

  const [reasonIndex, setReasonIndex] = useState(0)

  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const [secret, setSecret] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const [playing, setPlaying] = useState(false)

  const [finalUnlocked, setFinalUnlocked] = useState(false)

  const [visited, setVisited] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('universeVisited') || '[]'
      )
    } catch {
      return []
    }
  })


  /* =======================================================
     AUDIO
  ======================================================= */

  const audioRef = useRef(null)

  useEffect(() => {

    if (audioRef.current) {
      audioRef.current.volume = 0.35
    }

  }, [])


  const toggleMusic = async () => {

    if (!audioRef.current) return

    if (playing) {

      audioRef.current.pause()
      setPlaying(false)

      return
    }

    try {

      await audioRef.current.play()

      setPlaying(true)

    } catch (error) {

      console.log('Audio playback failed:', error)

    }
  }


  /* =======================================================
     STARS
  ======================================================= */

  const stars = useMemo(
    () =>
      Array.from({ length: 95 }, (_, i) => ({
        id: i,
        left: `${(i * 37.17) % 100}%`,
        top: `${(i * 61.43) % 100}%`,
        size: `${1 + (i % 3) * 0.8}px`,
        delay: `${(i % 9) * 0.7}s`,
        duration: `${3 + (i % 5)}s`
      })),
    []
  )


  /* =======================================================
     OPEN SECTION
  ======================================================= */

  const openSection = (id) => {

    setSection(id)

    setVisited((v) => {

      const next = [...new Set([...v, id])]

      localStorage.setItem(
        'universeVisited',
        JSON.stringify(next)
      )

      return next
    })
  }


  /* =======================================================
     SECTIONS
  ======================================================= */

  const sections = [
    {
      id: 'letter',
      label: 'A Letter From Me',
      icon: Mail,
      pos: 'p1',
      accent: 'pink'
    },
    {
      id: 'memories',
      label: 'Our Memories',
      icon: Camera,
      pos: 'p2',
      accent: 'gold'
    },
    {
      id: 'reasons',
      label: 'Why You',
      icon: Heart,
      pos: 'p3',
      accent: 'rose'
    },
    {
      id: 'song',
      label: 'Our Song',
      icon: Music2,
      pos: 'p4',
      accent: 'violet'
    },
    {
      id: 'film',
      label: 'Our Little Film',
      icon: FilmIcon,
      pos: 'p5',
      accent: 'blue'
    },
    {
      id: 'game',
      label: 'Our Little Game',
      icon: Gamepad2,
      pos: 'p6',
      accent: 'lavender'
    },
    {
      id: 'future',
      label: 'Our Future',
      icon: Moon,
      pos: 'p7',
      accent: 'rose'
    },
    {
      id: 'secret',
      label: 'Secret Vault',
      icon: Lock,
      pos: 'p8',
      accent: 'white'
    }
  ]


  /* =======================================================
     FINAL UNLOCK
  ======================================================= */

  useEffect(() => {

    if (visited.length >= 6 && !finalUnlocked) {

      const timer = setTimeout(
        () => setFinalUnlocked(true),
        900
      )

      return () => clearTimeout(timer)
    }

  }, [visited.length, finalUnlocked])


  /* =======================================================
     LANDING PAGE
  ======================================================= */

  if (!entered) {

    return (
      <div className="app landing">

        <StarField stars={stars} />

        <LoveDecor />

        <div className="nebula n1" />
        <div className="nebula n2" />
        <div className="nebula n3" />

        <div className="moon-orb">
          <div className="moon-crater c1" />
          <div className="moon-crater c2" />
          <div className="moon-crater c3" />
        </div>

        <div className="landing-content">

          <div className="eyebrow">
            💌
            <Sparkles size={14} />
            A little surprise for you
            <Sparkles size={14} />
            💌
          </div>

          <h1>
            Our Little
            <br />
            <span>Universe</span>
          </h1>

          <p>
            A tiny place I made for you,
            <br />
            filled with love, memories, hearts & pieces of us. 💗
          </p>

          <button
            className="primary-btn"
            onClick={() => setEntered(true)}
          >
            Enter Our Universe
            <ChevronRight size={18} />
          </button>

          <div className="scroll-hint">
            <span />
            take your time
            <span />
          </div>

        </div>

      </div>
    )
  }


  /* =======================================================
     MAIN UNIVERSE
  ======================================================= */

  return (
    <div className="app universe">

      <StarField stars={stars} />

      <LoveDecor />

      <div className="nebula n1" />
      <div className="nebula n2" />
      <div className="nebula n3" />


      {/* ===================================================
          MUSIC PLAYER
      =================================================== */}

      <audio
        ref={audioRef}
        src="/audio/love-song.mp3"
        loop
        preload="auto"
      />


      {/* ===================================================
          TOP BAR
      =================================================== */}

      <header className="topbar">

        <button
          className="wordmark"
          onClick={() => setSection(null)}
        >
          <span className="mini-star">💗</span>
          our little universe
        </button>


        <div className="couple-pill">
          Rudraksh ♡ Khushi
        </div>


        <button
          className="sound-btn"
          onClick={toggleMusic}
          aria-label={
            playing
              ? 'Pause music'
              : 'Play music'
          }
        >
          {playing ? '🔊' : '🔇'}
        </button>

      </header>


      {/* ===================================================
          HOME / SECTIONS
      =================================================== */}

      {!section ? (

        <main className="galaxy">

          <div className="galaxy-copy">

            <div className="eyebrow">
              <Sparkles size={14} />
              welcome, my sweet little baby
            </div>

            <h2>
              There are little pieces
              <br />
              <em>of us</em> scattered here.
            </h2>

            <p>
              Explore slowly. There is no order.
              Some things are waiting to be discovered.
            </p>

          </div>


          {/* =================================================
              HEART MENU
          ================================================= */}

          <div className="heart-menu">

            <div
              className="heart-outline"
              aria-hidden="true"
            />


            <div className="core">

              <div className="core-glow" />

              <Heart
                size={42}
                fill="currentColor"
              />

            </div>


            {sections.map((item) => {

              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  className={`
                    planet
                    ${item.pos}
                    ${item.accent}
                    ${visited.includes(item.id) ? 'visited' : ''}
                  `}
                  onClick={() => openSection(item.id)}
                >

                  <div className="planet-glow" />

                  <div className="planet-body">

                    <Icon size={23} />

                    <span className="planet-dot">
                      ✦
                    </span>

                  </div>

                  <span className="planet-label">
                    {item.label}
                  </span>

                </button>
              )
            })}

          </div>


          {/* =================================================
              BOTTOM NOTE
          ================================================= */}

          <div className="galaxy-note">

            <span>💕</span>

            <Star
              size={12}
              fill="currentColor"
            />

            follow the hearts

            <Star
              size={12}
              fill="currentColor"
            />

            <span>💕</span>

          </div>


          {/* =================================================
              FINAL BUTTON
          ================================================= */}

          {finalUnlocked && (

            <button
              className="final-star"
              onClick={() => setSection('final')}
            >

              <div>✦</div>

              <span>
                one last thing
              </span>

            </button>

          )}

        </main>

      ) : (

        <SectionView
          section={section}
          onBack={() => setSection(null)}
          memories={memories}
          reasons={reasons}
          reasonIndex={reasonIndex}
          setReasonIndex={setReasonIndex}
          future={future}
          playing={playing}
          setPlaying={setPlaying}
          quizIndex={quizIndex}
          setQuizIndex={setQuizIndex}
          quizScore={quizScore}
          setQuizScore={setQuizScore}
          quizDone={quizDone}
          setQuizDone={setQuizDone}
          secret={secret}
          setSecret={setSecret}
          unlocked={unlocked}
          setUnlocked={setUnlocked}
          finalUnlocked={finalUnlocked}
          setSection={setSection}
        />

      )}

      <div className="cursor-glow" />

    </div>
  )
}


/* =========================================================
   STAR FIELD
========================================================= */

function StarField({ stars }) {

  return (
    <div className="starfield">

      {stars.map((s) => (

        <span
          key={s.id}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration
          }}
        />

      ))}

    </div>
  )
}


/* =========================================================
   LOVE DECOR
========================================================= */

function LoveDecor() {

  const stickers = [
    ['💗', 's1 big'],
    ['💕', 's2'],
    ['🎀', 's3'],
    ['🫶', 's4 big'],
    ['💌', 's5'],
    ['🥰', 's6'],
    ['💖', 's7 big'],
    ['🌷', 's8'],
    ['🦋', 's9'],
    ['🧸', 's10'],
    ['😘', 's11'],
    ['💞', 's12 big'],
    ['♡', 's13 tiny'],
    ['✨', 's14 tiny'],
    ['💋', 's15 tiny'],
    ['🌸', 's16 tiny'],
    ['🥹', 's17 tiny'],
    ['💘', 's18 tiny']
  ]

  return (
    <div
      className="love-stickers"
      aria-hidden="true"
    >

      {stickers.map(([emoji, cls], i) => (

        <span
          key={i}
          className={`love-sticker ${cls}`}
        >
          {emoji}
        </span>

      ))}

    </div>
  )
}


/* =========================================================
   SECTION VIEW
========================================================= */

function SectionView(props) {

  const {
    section,
    onBack
  } = props


  const titles = {

    letter: [
      'A Letter From Me',
      'Things I wanted you to know.'
    ],

    memories: [
      'Our Memories',
      'A few pieces of our story.'
    ],

    reasons: [
      'Why You',
      'The little things I could never stop listing.'
    ],

    song: [
      'Our Song',
      'One song, a thousand feelings.'
    ],

    film: [
      'Our Little Film',
      'A tiny moving piece of us.'
    ],

    game: [
      'Our Little Game',
      'Okay, let’s see how well you remember us.'
    ],

    future: [
      'Our Future',
      'Things I hope we get to do together.'
    ],

    secret: [
      'Secret Vault',
      'There is something waiting behind this lock.'
    ],

    final: [
      'One Last Thing',
      'You made it all the way here.'
    ]

  }


  if (section === 'letter')
    return <Letter onBack={onBack} />

  if (section === 'memories')
    return <Memories {...props} />

  if (section === 'reasons')
    return <Reasons {...props} />

  if (section === 'song')
    return <Song {...props} />

  if (section === 'film')
    return <Film {...props} />

  if (section === 'game')
    return <Game {...props} />

  if (section === 'future')
    return <Future {...props} />

  if (section === 'secret')
    return <Secret {...props} />

  if (section === 'final')
    return <Final {...props} />


  return (
    <section className="section-page">

      <button
        className="back-btn"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        back to our universe
      </button>

      <div className="section-heading">

        <div className="eyebrow">
          <Sparkles size={14} />
          a little corner of us
        </div>

        <h2>
          {titles[section][0]}
        </h2>

        <p>
          {titles[section][1]}
        </p>

      </div>

    </section>
  )
}


/* =========================================================
   BACK BUTTON
========================================================= */

function Back({ onBack }) {

  return (
    <button
      className="back-btn"
      onClick={onBack}
    >
      <ArrowLeft size={17} />
      back to our universe
    </button>
  )
}


/* =========================================================
   LETTER
========================================================= */

function Letter({ onBack }) {

  return (
    <section className="section-page letter-page">

      <Back onBack={onBack} />

      <div className="letter-wrap">

        <div className="envelope-orbit">
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
        </div>


        <div className="paper">

          <div className="paper-top">

            <span>
              💌 for my favorite person
            </span>

            <span>
              💗
            </span>

          </div>


          <h2>
            💌 A Letter From Me
          </h2>


          <div className="letter-body">

            <p>
              Hey Rudraksh,
            </p>

            <p>
              My Sweet Little Baby,
            </p>

            <p>
              I wanted to make you something instead of
              giving you just another ordinary message,
              because you are anything but ordinary to me.
            </p>

            <p>
              We knew each other when we were kids,
              and somehow life brought us here —
              to <strong>18 January 2022</strong>,
              to all the memories after it,
              to all the time we have spent together,
              and to all the ridiculous moments that
              made us our certified Bevdas. 🤣
            </p>

            <p>
              I love your hugs. I love the way you are
              protective of me. And yes, I even love your
              clinginess — probably more than I admit.
            </p>

            <p>
              Most of all, I want you to know something
              I may not say enough:
              <strong>
                I love you more than you think,
                more than I show you,
                and more than I could ever explain
                to you or to this entire world.
              </strong>
            </p>

            <p>
              So I made this little universe for you.
              Every star is a tiny piece of something
              I feel, remember, or love about us.
            </p>

            <p className="signature">

              Always, always, always... 💗
              <br />

              <strong>
                Khushi ♡
              </strong>

            </p>

          </div>

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   MEMORIES
========================================================= */

function Memories({ onBack, memories }) {

  const [active, setActive] = useState(0)

  const photos = [
    '/media/memory-01.png',
    '/media/memory-02.png',
    '/media/memory-03.png',
    '/media/memory-04.png',
    '/media/memory-05.png'
  ]

  const captions = [

    [
      'Little moments',
      'The kind of memories that make me smile for no reason.'
    ],

    [
      'Our kind of chaos',
      'Certified Bevdas. Officially. 🤣'
    ],

    [
      'My favorite reflection',
      'Sometimes the best place to be is right beside you.'
    ],

    [
      'Just us',
      'A little ordinary moment that became something special.'
    ],

    [
      'A little piece of forever',
      'I hope we keep collecting moments like this.'
    ]

  ]


  const safeIndex = Math.min(
    active,
    Math.min(memories.length, captions.length) - 1
  )

  const m = memories[safeIndex]


  return (
    <section className="section-page">

      <Back onBack={onBack} />


      <div className="section-heading">

        <div className="eyebrow">
          📸
          <Camera size={14} />
          memory lane 💗
        </div>

        <h2>
          📸 Our Memories
        </h2>

        <p>
          A scrapbook made from the moments
          I never want to forget.
        </p>

      </div>


      <div className="scrapbook">

        <div className="scrapbook-feature">

          <div className="photo-stage">

            <img
              key={photos[active]}
              src={photos[active]}
              alt={captions[active][0]}
            />

            <span className="floating-doodle">
              ♡
            </span>

          </div>


          <div className="memory-info">

            <span className="memory-symbol">
              {m.emoji}
            </span>

            <small>
              {m.date}
            </small>

            <h3>
              {captions[active][0]}
            </h3>

            <p>
              {captions[active][1]}
            </p>

            <p className="memory-story">
              {m.text}
            </p>

          </div>

        </div>


        <div className="scrapbook-grid">

          {photos.map((src, i) => (

            <button
              key={src}
              className={`scrap-photo ${
                i === active ? 'selected' : ''
              }`}
              onClick={() => setActive(i)}
            >

              <img
                src={src}
                alt={`Memory ${i + 1}`}
              />

              <span>
                {String(i + 1).padStart(2, '0')}
              </span>

            </button>

          ))}

        </div>

      </div>


      <div className="memory-note">

        <Heart
          size={14}
          fill="currentColor"
        />

        💕 five little windows into our world 💕

        <Heart
          size={14}
          fill="currentColor"
        />

      </div>

    </section>
  )
}


/* =========================================================
   FILM
========================================================= */

function Film({ onBack }) {

  return (
    <section className="section-page film-page">

      <Back onBack={onBack} />


      <div className="section-heading centered">

        <div className="eyebrow">
          🎞️
          <FilmIcon size={14} />
          moving memory 💗
        </div>

        <h2>
          🎞️ Our Little Film
        </h2>

        <p>
          Because some memories deserve to move,
          not just sit inside a photo.
        </p>

      </div>


      <div className="film-frame">

        <div className="film-tape top">
          ✦ · ✦ · ✦ · ✦ · ✦ · ✦
        </div>


        <video
          controls
          playsInline
          preload="metadata"
          poster="/media/film-poster.jpg"
        >

          <source
            src="/media/our-film.mp4"
            type="video/mp4"
          />

          Your browser does not support video playback.

        </video>


        <div className="film-caption">

          <span>
            Rudraksh × Khushi
          </span>

          <strong>
            one tiny film from our universe 💗
          </strong>

        </div>


        <div className="film-tape bottom">
          ♡ · ✦ · ♡ · ✦ · ♡ · ✦
        </div>

      </div>

    </section>
  )
}


/* =========================================================
   REASONS
========================================================= */

function Reasons({
  onBack,
  reasons,
  reasonIndex,
  setReasonIndex
}) {

  return (
    <section className="section-page">

      <Back onBack={onBack} />


      <div className="section-heading centered">

        <div className="eyebrow">

          💗
          <Heart
            size={14}
            fill="currentColor"
          />
          little reasons 💕

        </div>

        <h2>
          💗 Why You
        </h2>

        <p>
          There are probably a million reasons.
          Here are a few.
        </p>

      </div>


      <div className="reason-card">

        <div className="heart-bloom">
          💗
        </div>

        <div className="reason-number">

          {String(reasonIndex + 1).padStart(2, '0')}
          {' / '}
          {String(reasons.length).padStart(2, '0')}

        </div>


        <p>
          {reasons[reasonIndex]}
        </p>


        <button
          className="primary-btn"
          onClick={() =>
            setReasonIndex(
              (reasonIndex + 1) % reasons.length
            )
          }
        >

          another reason 💕
          <Sparkles size={16} />

        </button>

      </div>

    </section>
  )
}


/* =========================================================
   SONG
========================================================= */

function Song({
  onBack,
  playing,
  setPlaying
}) {

  return (
    <section className="section-page">

      <Back onBack={onBack} />


      <div className="song-page">

        <div className="record">

          <div className="record-label">

            OUR
            <br />

            <strong>
              SONG
            </strong>

          </div>

          <div className="record-hole" />

        </div>


        <div className="song-copy">

          <div className="eyebrow">

            🎧
            <Music2 size={14} />
            press play 💗

          </div>


          <h2>
            🎵 Dekha Hazaro Dafaa
          </h2>


          <p>
            “Dekha hazaro dafaa apko, fir bekrari kaisi
            hai.” Some songs are not just songs —
            they carry a feeling, a person,
            a whole little universe.
          </p>


          <button
            className="play-btn"
            onClick={() => setPlaying(!playing)}
          >

            {playing ? (
              <Pause fill="currentColor" />
            ) : (
              <Play fill="currentColor" />
            )}

            {playing ? ' playing' : ' play'}

          </button>


          <div className="equalizer">

            {Array.from(
              { length: 18 },
              (_, i) => (

                <i
                  key={i}
                  className={
                    playing ? 'bar-on' : ''
                  }
                  style={{
                    animationDelay: `${i * 0.08}s`
                  }}
                />

              )
            )}

          </div>

        </div>

      </div>

    </section>
  )
}


/* =========================================================
   GAME
========================================================= */

function Game({
  onBack,
  quizIndex,
  setQuizIndex,
  quizScore,
  setQuizScore,
  quizDone,
  setQuizDone
}) {

  const qs = [

    {
      q: 'What makes our relationship ours?',
      a: [
        'The tiny inside jokes',
        'A perfect plan',
        'Never arguing',
        'Being exactly the same'
      ]
    },

    {
      q: 'What is the most important part of a memory?',
      a: [
        'The expensive place',
        'The perfect photo',
        'Who you shared it with',
        'How Instagram liked it'
      ]
    },

    {
      q: 'What should our future have more of?',
      a: [
        'More ordinary days together',
        'More deadlines',
        'More silence',
        'More serious meetings'
      ]
    }

  ]


  const correct = [0, 2, 0]


  const answer = (i) => {

    if (i === correct[quizIndex]) {
      setQuizScore(quizScore + 1)
    }

    if (quizIndex === qs.length - 1) {

      setQuizDone(true)

    } else {

      setQuizIndex(quizIndex + 1)

    }

  }


  return (
    <section className="section-page">

      <Back onBack={onBack} />


      <div className="game-shell">

        {!quizDone ? (

          <>

            <div className="eyebrow">

              🎮
              <Gamepad2 size={14} />
              question {quizIndex + 1} of {qs.length} 💕

            </div>


            <h2>
              {qs[quizIndex].q}
            </h2>


            <div className="answers">

              {qs[quizIndex].a.map((a, i) => (

                <button
                  key={a}
                  onClick={() => answer(i)}
                >

                  <span>
                    {String.fromCharCode(65 + i)}
                  </span>

                  {a}

                </button>

              ))}

            </div>

          </>

        ) : (

          <div className="quiz-result">

            <div className="result-orb">
              💖
            </div>

            <div className="eyebrow">
              game complete
            </div>

            <h2>
              Look at you.
            </h2>

            <p>
              You got
              <strong>
                {' '}{quizScore} / {qs.length}
              </strong>.
              But honestly, the score was never the point.
            </p>


            <button
              className="primary-btn"
              onClick={() => {

                setQuizIndex(0)
                setQuizScore(0)
                setQuizDone(false)

              }}
            >

              play again
              <Sparkles size={16} />

            </button>

          </div>

        )}

      </div>

    </section>
  )
}


/* =========================================================
   FUTURE
========================================================= */

function Future({
  onBack,
  future
}) {

  const [active, setActive] = useState(0)


  return (
    <section className="section-page">

      <Back onBack={onBack} />


      <div className="section-heading centered">

        <div className="eyebrow">

          🌷
          <Moon size={14} />
          someday 💗

        </div>


        <h2>
          🌷 Our Future
        </h2>


        <p>
          I don't know exactly what it looks like.
          I just know who I want beside me.
        </p>

      </div>


      <div className="future-grid">

        {future.map(
          ([icon, title, text], i) => (

            <button
              key={title}
              className={`future-card ${
                active === i ? 'active' : ''
              }`}
              onClick={() => setActive(i)}
            >

              <span>
                {icon}
              </span>

              <h3>
                {title}
              </h3>

              <p>
                {text}
              </p>

            </button>

          )
        )}

      </div>

    </section>
  )
}


/* =========================================================
   SECRET
========================================================= */

function Secret({
  onBack,
  secret,
  setSecret,
  unlocked,
  setUnlocked
}) {

  const submit = () => {

    if (
      secret.trim().toLowerCase() ===
      '22/02/2022'
    ) {

      setUnlocked(true)

    }

  }


  return (
    <section className="section-page secret-page">

      <Back onBack={onBack} />


      <div className="vault">

        {!unlocked ? (

          <>

            <div className="lock-orb">
              🔐
              <Lock size={28} />
            </div>


            <div className="eyebrow">

              💌
              <Lock size={14} />
              classified 💗

            </div>


            <h2>
              Something is waiting.
            </h2>


            <p>
              Enter the secret word.
              Hint: it is a date that belongs to us.
            </p>


            <div className="secret-form">

              <input
                value={secret}
                onChange={(e) =>
                  setSecret(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' && submit()
                }
                placeholder="secret word..."
              />


              <button onClick={submit}>
                <ChevronRight />
              </button>

            </div>

          </>

        ) : (

          <div className="unlocked">

            <div className="unlock-burst">
              💖✨💖
            </div>

            <div className="eyebrow">
              💌 access granted 💌
            </div>

            <h2>
              You found it.
            </h2>

            <p>
              This space is reserved for the thing
              I want you to remember most:
            </p>


            <div className="secret-message">

              No matter how big the world gets,
              <br />

              <strong>
                you will always have a little place
                in my heart.
              </strong>

              {' '}💗

            </div>

          </div>

        )}

      </div>

    </section>
  )
}


/* =========================================================
   FINAL
========================================================= */

function Final({
  onBack
}) {

  const [show, setShow] = useState(false)


  return (
    <section className="final-page">

      <div className="final-stars">

        {Array.from(
          { length: 40 },
          (_, i) => (

            <i
              key={i}
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${(i * 73) % 100}%`,
                animationDelay: `${i * 0.13}s`
              }}
            >
              ✦
            </i>

          )
        )}

      </div>


      <button
        className="back-btn final-back"
        onClick={onBack}
      >

        <ArrowLeft size={17} />
        back

      </button>


      {!show ? (

        <div className="final-center">

          <div
            className="giant-star"
            onClick={() => setShow(true)}
          >
            💗
          </div>

          <div className="eyebrow">
            💘 you found the center 💘
          </div>

          <h2>
            One last thing.
          </h2>

          <p>
            Tap the star.
          </p>

        </div>

      ) : (

        <div className="final-center reveal">

          <Heart
            className="final-heart"
            fill="currentColor"
          />

          <div className="eyebrow">
            💗 the center of my universe 💗
          </div>

          <h2>
            You. 💗
          </h2>

          <p>
            I could fill this entire universe with
            words, memories, photos and stars...
          </p>

          <p>
            <strong>
              But somehow, the simplest thing
              is still the truest:
            </strong>
          </p>

          <div className="final-quote">

            I love you.
            <br />

            More than you think.
            More than I show.
            More than the world knows.

          </div>

          <div className="final-sign">
            — Khushi 💕
          </div>

        </div>

      )}

    </section>
  )
}


/* =========================================================
   RENDER
========================================================= */

createRoot(
  document.getElementById('root')
).render(
  <App />
)