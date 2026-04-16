import React, { useEffect, useMemo, useRef, useState } from "react";

type AccordionItemData = {
  title: string;
  content: React.ReactNode;
};

type ImageMap = {
  hero: string;
  storyMain: string;
  storyRat: string;
  program: string;
  discounts: string;
  noMoney: string;
  message1: string;
  message2: string;
};

const images: ImageMap = {
  hero: "/images/hero.png",
  storyMain: "/images/story-main.png",
  storyRat: "/images/story-rat.png",
  program: "/images/program.png",
  discounts: "/images/discounts.png",
  noMoney: "/images/no-money.png",
  message1: "/images/message-1.png",
  message2: "/images/message-2.png",
};

const links = {
  buy: `https://t.me/lewiscarrot?text=${encodeURIComponent(
    "Привет! Хочу купить курс Визуальный интеллект. Подскажи, как это сделать"
  )}`,
  ask: `https://t.me/lewiscarrot?text=${encodeURIComponent(
    "Привет! У меня осталось несколько вопросов по курсу Визуальный интеллект"
  )}`,
  freeDoc: "https://docs.google.com/document/d/1d-6lnlbe_-T8-eBsvF6tVDHCr__oNTx97x2_6H4qOAM/edit?usp=sharing",
  telegram: `https://t.me/lewiscarrot?text=${encodeURIComponent(
    "Привет! У меня несколько вопросов по курсу Визуальный интеллект"
  )}`,
  instagram: "https://www.instagram.com/lewis_carrot",
};

function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function SmoothAnchorButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isAnchor = href.startsWith("#");

  const base =
    "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium tracking-[-0.01em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-black/10";

  const styles =
    variant === "primary"
      ? "border-[#171717] bg-[#171717] text-white hover:bg-[#2a2a2a] hover:border-[#2a2a2a]"
      : "border-black/10 bg-white text-[#171717] hover:border-black/20 hover:bg-[#f5f5f2]";

  if (!isAnchor) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls(base, styles)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={cls(base, styles)}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-black/35 sm:text-xs">
      {children}
    </div>
  );
}

function SectionTitle({ children, large = false }: { children: React.ReactNode; large?: boolean }) {
  return (
    <h2
      className={cls(
        "max-w-4xl font-semibold tracking-[-0.04em] text-[#111111]",
        large ? "text-4xl leading-[0.95] sm:text-5xl lg:text-6xl" : "text-3xl leading-[1.02] sm:text-4xl lg:text-5xl"
      )}
    >
      {children}
    </h2>
  );
}

function SectionText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cls("space-y-5 text-base leading-7 text-black/68 sm:text-[17px] sm:leading-8", className)}>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-black/72">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7">
          <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-black/45" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AccentImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cls("relative overflow-visible", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-black/[0.03] blur-3xl" />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="h-auto w-full select-none object-contain"
      />
    </div>
  );
}

function InlineImageCard({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cls("my-5", className)}>
      <div className="inline-block overflow-hidden rounded-[1.4rem] border border-black/8 bg-white p-2 shadow-[0_10px_35px_rgba(0,0,0,0.03)] sm:p-3">
        <img src={src} alt={alt} className={cls("block h-auto w-full object-contain", imgClassName)} />
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={cls(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
  reducedMotion,
}: {
  item: AccordionItemData;
  open: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [item.content, open]);

  return (
    <div className="border-t border-black/8 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
        aria-expanded={open}
      >
        <span className="text-lg font-medium tracking-[-0.02em] text-[#111111] sm:text-[1.3rem]">{item.title}</span>
        <span
          className={cls(
            "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/55 transition duration-300",
            open && "rotate-45 text-[#111111]"
          )}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? height : 0,
          transition: reducedMotion ? "none" : "max-height 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease",
          opacity: open ? 1 : 0.6,
        }}
      >
        <div ref={innerRef} className="pb-6 pr-2 text-[15px] leading-7 text-black/68 sm:text-base sm:leading-8">
          {item.content}
        </div>
      </div>
    </div>
  );
}

function Accordion({
  items,
  allowMultiple = true,
  defaultOpen = [],
}: {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen);

  const toggle = (index: number) => {
    setOpenIndexes((current) => {
      const exists = current.includes(index);
      if (allowMultiple) {
        return exists ? current.filter((i) => i !== index) : [...current, index];
      }
      return exists ? [] : [index];
    });
  };

  return (
    <div className="rounded-[1.75rem] border border-black/8 bg-white p-3 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sm:p-4 lg:p-5">
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          item={item}
          open={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}

function PriceCard({
  name,
  price,
  items,
  emphasis = false,
  extra,
}: {
  name: string;
  price: string;
  items: string[];
  emphasis?: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <div
      className={cls(
        "relative flex h-full flex-col rounded-[2rem] border p-6 sm:p-8",
        emphasis
          ? "border-black/14 bg-[#f5f5f2] shadow-[0_16px_50px_rgba(0,0,0,0.04)]"
          : "border-black/8 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
      )}
    >
      <div className="mb-8 space-y-3">
        <div className="text-sm uppercase tracking-[0.24em] text-black/38">{name}</div>
        <div className="text-4xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-5xl">{price}</div>
      </div>

      <ul className="mb-8 space-y-3 text-black/72">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7">
            <span className={cls("mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full", emphasis ? "bg-black/55" : "bg-black/40")} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {extra ? <div className="mb-8 text-black/68">{extra}</div> : null}

      <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SmoothAnchorButton href={links.buy}>Купить сразу</SmoothAnchorButton>
        <SmoothAnchorButton href={links.ask} variant="secondary">
          У меня есть пара вопросов
        </SmoothAnchorButton>
      </div>
    </div>
  );
}

export default function VisualIntelligenceLanding() {
  const programItems = useMemo<AccordionItemData[]>(
    () => [
      {
        title: "Нулевой блок",
        content: (
          <div className="space-y-5">
            <p className="text-lg font-medium tracking-[-0.02em] text-[#111111]">Старт и настройка рабочего процесса</p>
            <p>Чтобы никто не терялся на входе, сначала разбираем базу:</p>
            <BulletList
              items={[
                "как будет устроено обучение;",
                "как оплатить и оформить подписки на нужные сервисы, если вы из России;",
                "какие инструменты понадобятся для прохождения курса;",
                "как настроить рабочую среду без хаоса и боли;",
                "какие ai-инструменты реально пригодятся в работе, а какие можно не трогать.",
              ]}
            />
            <p>И добавим к своему инструментарию авторские орудия:</p>
            <BulletList
              items={[
                "настроенные gpt-модели и Gemini Gems для ускорения работы;",
                "вспомогательные материалы для генерации идей, структуры роликов и визуальных решений.",
              ]}
            />
          </div>
        ),
      },
      {
        title: "Блок 1",
        content: (
          <div className="space-y-5">
            <p className="text-lg font-medium tracking-[-0.02em] text-[#111111]">Арт-дирекшн и визуальное мышление</p>
            <p>
              Здесь мы разбираем, как вообще устроен визуальный язык ролика и почему одни видео смотрятся сильно, а другие
              хочется пролистнуть с первой миллисекунды.
            </p>
            <p>Что внутри:</p>
            <BulletList
              items={[
                "где искать мясо для идей и воровать полезные референсы",
                "композиция: как управлять вниманием внутри кадра",
                "перспектива, ракурсы и крупность",
                "свет и цвет как инструменты смысла",
                "типографика в статике и роликах",
                "основы сторителлинга и визуальной логики",
                "как собрать цельный образ ролика до монтажа",
                "как начать вырабатывать свой визуальный вкус и стиль.",
              ]}
            />
          </div>
        ),
      },
      {
        title: "Блок 2",
        content: (
          <div className="space-y-5">
            <p className="text-lg font-medium tracking-[-0.02em] text-[#111111]">Монтаж: база, ритм и приемы</p>
            <p>В этом блоке:</p>
            <BulletList
              items={[
                "знакомство с CapCut PC. быстрый старт, горячие клавиши и логика чистой работы",
                "как собирать ролик так, чтобы он удерживал внимание",
                "склейки и переходы: базовые и продвинутые",
                "работа с анимационной типографикой",
                "анимированные вставки",
                "цветокоррекция",
                "работа с масками и слоями. инструменты для создания многослойных композиций",
                "как добавлять акценты, не превращая ролик в кашу",
                "саунд-дизайн и его роль в восприятии видео",
                "как нарушать базовые правила осознанно, а не случайно",
              ]}
            />
          </div>
        ),
      },
      {
        title: "Блок 3",
        content: (
          <div className="space-y-5">
            <p className="text-lg font-medium tracking-[-0.02em] text-[#111111]">AI-инструменты для реальной работы</p>
            <p>Что разбираем:</p>
            <BulletList
              items={[
                "генерация статичных кадров с нуля и с референсами",
                "работа на базе реальной съемки",
                "стилизация и реализм",
                "анимация с помощью ai",
                "как вписывать генерации в ролик так, чтобы это выглядело уместно",
                "как использовать нейросети для сценариев, поиска идей и визуального развития проекта",
              ]}
            />
          </div>
        ),
      },
      {
        title: "Блок 4",
        content: (
          <div className="space-y-5">
            <p className="text-lg font-medium tracking-[-0.02em] text-[#111111]">Сборка цельных роликов и авторский подход</p>
            <p>
              Финальный смысл курса — не в отдельных приемах, а в умении собирать из них цельную работу.
            </p>
            <p>Здесь мы соединяем все вместе:</p>
            <BulletList
              items={[
                "смешанные техники. как сочетать 2d, 3d, реальное видео и ai в одном кадре.",
                "поиск стиля и разработка пайплайна. как собрать свою лабораторию инструментов, чтобы делать ролики быстро, но в своем уникальном стиле.",
                "как делать ролики для себя, клиентов, блога или коммерческих задач;",
                "как не копировать чужие решения, а перерабатывать их в свой язык;",
                "как развивать насмотренность и собственное направление дальше.",
              ]}
            />
          </div>
        ),
      },
      {
        title: "Что будет на практике",
        content: (
          <div className="space-y-5">
            <BulletList
              items={[
                "домашние задания по каждому блоку;",
                "разборы ошибок;",
                "ориентир не только на понимание, но и на применение;",
                "задания, которые можно использовать как заготовки для будущих роликов и портфолио.",
              ]}
            />
            <p>
              Кроме того, за курс мы создадим 6 авторских роликов — не в формате “возьми мой шаблон”, а в формате
              самостоятельной сборки роликов по уникальным сценариям, с собственными решениями и авторским почерком.
            </p>
          </div>
        ),
      },
    ],
    []
  );

  const faqItems = useMemo<AccordionItemData[]>(
    () => [
      {
        title: "1. На какое время дается доступ?",
        content: (
          <>
            <p>Доступ к курсу остается навсегда.</p>
            <p>
              Но если вы хотите получить обратную связь по домашним заданиям, прислать их на проверку нужно в течение 60
              дней с момента получения доступа.
            </p>
          </>
        ),
      },
      {
        title: "2. У меня вообще нет опыта ни в монтаже, ни в генерациях с помощью нейросетей. Я смогу пройти курс?",
        content: (
          <>
            <p>
              Да. Курс выстроен от простого к сложному: в каждом блоке сначала идет база, понятная новичкам, а потом —
              приемы, усиление и более интересные решения.
            </p>
            <p>
              Все продумано так, чтобы новички не оставались на базовом уровне, а быстро росли в сторону более сильных и
              осознанных работ.
            </p>
          </>
        ),
      },
      {
        title: "3. Нужен ли ПК или ноутбук?",
        content: (
          <>
            <p>Не обязательно. Курс можно пройти и с телефона.</p>
            <p>
              Но ПК или ноутбук дадут более высокую скорость работы и доступ к некоторым дополнительным фишкам. Это не
              основа курса, но примерно 15–20% возможностей действительно удобнее реализовывать с компьютера.
            </p>
          </>
        ),
      },
      {
        title: "4. Я пока не понимаю, для какой работы мне могут пригодиться монтаж и нейросети, но мне интересно. Нужен ли мне этот курс?",
        content: (
          <>
            <p>
              Лучше просто напишите мне в личку. Вместе разберемся, подойдет ли вам этот курс именно под ваши задачи.
            </p>
            <p>
              Вполне возможно, что на вашем этапе вам нужнее не платное обучение, а какой-то бесплатный материал, которым я
              могу поделиться (мне не жалко)
            </p>
          </>
        ),
      },
      {
        title: "5. Моя жизнь вообще не связана с творчеством. Получится ли у меня?",
        content: (
          <>
            <p>
              Да. До своего творческого пути я вообще была микробиологом и работала в самой настоящей лаборатории.
            </p>
            <p>
              Креативность и “талант” прокачиваются через знания, практику и насмотренность. Особенно если не просто
              смотреть уроки, а сразу применять все на практике. Для этого в курсе и есть домашние задания.
            </p>
          </>
        ),
      },
      {
        title: "6. Я уже что-то умею. Мне не будет слишком просто?",
        content: (
          <>
            <p>
              Если вы уже знаете базу, вы сможете сразу перейти к более вкусным частям курса, а значит, у нас будет больше
              времени на обратную связь и совершенствование ваших роликов. Курс все равно даст вам структуру, более
              сильное понимание визуального языка, новые приемы и более осознанную работу с монтажом и AI.
            </p>
            <p>
              Отличная возможность для тех, кто уже делает ролики, но хочет выйти из хаотичной работы в более сильную
              систему.
            </p>
          </>
        ),
      },
      {
        title: "7. Будут ли обновления?",
        content: (
          <>
            <p>
              Если по ходу времени я буду добавлять в курс полезные новые материалы, и к ним у вас тоже будет доступ.
            </p>
            <p>
              Но главный фокус курса — не на погоне за каждой новой фишкой, а на фундаменте, который не устаревает через
              две недели.
            </p>
          </>
        ),
      },
      {
        title: "8. Сколько денег понадобится на подписки?",
        content: (
          <>
            <p>Если совсем по-минималке, то можно уложиться примерно в 2 000 ₽.</p>
            <p>
              Если хочется стартовать быстрее и с более удобным набором инструментов — ориентируйтесь примерно на 6 000 ₽.
            </p>
            <p>
              Я отдельно покажу, что реально нужно для работы, а что можно пока не оплачивать, чтобы не сливать деньги в
              пустоту.
            </p>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#fbfbf8] text-[#111111] antialiased selection:bg-[#171717] selection:text-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-18%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-black/[0.025] blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-black/[0.02] blur-3xl" />
      </div>

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-5 sm:px-6 sm:pb-24 lg:px-8 lg:pb-32 lg:pt-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14 xl:gap-20">
              <Reveal className="order-2 lg:order-1">
                <div className="max-w-3xl pt-12 sm:pt-16 lg:pt-24">
                  <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/8 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-black/48 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/55" />
                    Старт — 01.05.2026
                  </div>

                  <h1 className="max-w-4xl text-[3rem] font-semibold leading-[0.92] tracking-[-0.06em] text-[#111111] sm:text-[4.8rem] lg:text-[6.3rem] xl:text-[7rem]">
                    Визуальный интеллект
                  </h1>

                  <p className="mt-7 max-w-2xl text-lg leading-8 text-black/68 sm:text-xl sm:leading-9 lg:text-[1.45rem] lg:leading-10">
                    Как управлять вниманием людей с помощью креативных роликов, монтажа и AI
                  </p>

                  <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <SmoothAnchorButton href="#program">Программа курса</SmoothAnchorButton>
                  </div>
                </div>
              </Reveal>

              <Reveal className="order-1 lg:order-2">
                <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
                  <div className="absolute right-[8%] top-[8%] h-24 w-24 rounded-full border border-black/8" />
                  <div className="absolute bottom-[14%] left-[4%] h-16 w-16 rounded-full border border-black/6" />
                  <AccentImage
                    src={images.hero}
                    alt="Иллюстрация для заставки курса"
                    priority
                    className="relative z-10 mx-auto w-full max-w-[560px] translate-y-2 lg:max-w-[640px] lg:translate-x-6 xl:translate-x-10"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="max-w-3xl">
                <SectionEyebrow>Предыстория</SectionEyebrow>
                <SectionTitle>Как вообще появился этот курс</SectionTitle>

                <SectionText className="mt-8 max-w-2xl">
                  <InlineImageCard
                    src={images.storyMain}
                    alt="Основная иллюстрация к истории создания курса"
                    className="mb-7"
                    imgClassName="max-w-[380px] sm:max-w-[430px]"
                  />

                  <p>Давным-давно, когда земля была покрыта льдом…</p>
                  <p>
                    А точнее — в декабре прошлого года я в очередной раз начала вести блог.
                  </p>
                  <p>
                    Хотя к тому моменту я уже почти 3 года снимала и монтировала ролики на заказ, в себя вкладываться мне
                    было страшно до смешного. Казалось, что я только зря потрачу время и буду сто лет идти к первой тысяче
                    подписчиков. Хотя ролики для заказчиков стабильно залетали, приносили подписоту и денежки.
                  </p>
                  <p>Да-да, такой вот я нерешительный тепличный цветочек.</p>
                  <p>
                    Но почти сразу после первых роликов на меня стали подписываться вы — мои прикольные чюваки. А потом
                    начали спрашивать:
                  </p>
                  <p className="text-[#111111]">“Где научиться монтировать так же?”</p>
                  <p>Первому человеку, который это спросил, я ответила:</p>

                  <InlineImageCard
                    src={images.message1}
                    alt="Скриншот первого сообщения с вопросом про курс"
                    className="my-4"
                    imgClassName="max-w-[520px]"
                  />

                  <p className="text-[#111111]">“Когда меня лично спросят про обучение 10 человек – я сделаю курс.”</p>
                  <p>
                    С тех пор прошло несколько месяцев, и людей, которые спрашивали про обучение, стало сильно больше
                    десяти.
                  </p>
                  <p>
                    Несмотря на весь этот интерес, я все равно уже собиралась дать заднюю. Потому что создавать обучение –
                    это сложно, а усложнять себе жизнь я не очень люблю. Но когда мне начали писать по второму кругу:
                  </p>

                  <InlineImageCard
                    src={images.message2}
                    alt="Скриншот сообщения с повторным вопросом про курс"
                    className="my-4"
                    imgClassName="max-w-[620px]"
                  />

                  <p className="text-[#111111]">“Когда уже курс?”</p>

                  <InlineImageCard
                    src={images.storyRat}
                    alt="Иллюстрация с крысой к моменту про решение все-таки сделать курс"
                    className="my-5"
                    imgClassName="max-w-[320px] sm:max-w-[360px]"
                  />

                  <p>
                    я поняла, что буду просто крысой, если хотя бы не попробую это сделать.
                  </p>
                  <p>
                    Так и появился этот курс: как попытка собрать воедино мой опыт, видение и рабочие инструменты. И самое
                    главное – не наштамповать кучу копий, которые умеют только повторять заученную последовательность
                    действий, а дать нормальные орудия и знания тем, кто хочет делать сильные ролики, развивать вкус,
                    находить свой стиль и даже задавать новые тренды и креативные направления.
                  </p>
                </SectionText>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="program" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="max-w-3xl">
                <div className="mb-10">
                  <AccentImage
                    src={images.program}
                    alt="Иллюстрация к программе курса"
                    className="w-full max-w-[420px]"
                  />
                </div>
                <SectionEyebrow>Программа курса</SectionEyebrow>
                <div className="mt-10 max-w-4xl">
                  <Accordion items={programItems} defaultOpen={[0, 1]} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="max-w-3xl">
                <SectionTitle>Ответы на вопросы</SectionTitle>
                <div className="mt-10 max-w-4xl">
                  <Accordion items={faqItems} defaultOpen={[0]} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="max-w-3xl">
                <SectionEyebrow>Тарифы</SectionEyebrow>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <Reveal>
                <PriceCard
                  name="Базовый"
                  price="15 000 ₽"
                  items={[
                    "все уроки курса;",
                    "вечный доступ;",
                    "домашние задания;",
                    "обратная связь в общем чате;",
                    "возможность присылать домашки на проверку в течение 60 дней.",
                  ]}
                />
              </Reveal>

              <Reveal>
                <PriceCard
                  name="Заряженный"
                  price="40 000 ₽"
                  emphasis
                  items={[
                    "все из базового тарифа;",
                    "разбор всех домашних заданий и вопросов в личном чате;",
                    "4 персональных созвона;",
                    "возможность выбрать фокус созвонов под свои задачи:",
                    "продвижение в соцсетях;",
                    "преодоление страха проявляться;",
                    "развитие собственного творческого видения;",
                    "обсуждение ваших роликов и идей, не вошедших в ролики;",
                    "помощь в выстраивании личного направления.",
                  ]}
                  extra={<div className="rounded-2xl border border-black/8 bg-[#f2f2ef] px-4 py-3 text-sm tracking-[0.02em]">Только 2 места</div>}
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 rounded-[2.25rem] border border-black/8 bg-white px-6 py-8 shadow-[0_12px_45px_rgba(0,0,0,0.03)] sm:px-8 sm:py-10 lg:grid-cols-[minmax(320px,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:px-10 xl:px-14">
            <Reveal>
              <div className="relative mx-auto w-full max-w-[420px] lg:-translate-x-4 xl:-translate-x-8">
                <AccentImage src={images.discounts} alt="Иллюстрация к блоку со скидками" />
              </div>
            </Reveal>

            <Reveal>
              <div className="max-w-3xl lg:ml-auto">
                <SectionEyebrow>А скидки будут?</SectionEyebrow>
                <SectionText className="max-w-2xl">
                  <p>Да.</p>
                  <p>
                    Если вы писали мне про курс до публикации этого лендинга, то есть до 17 апреля, для вас действует
                    скидка 33%.
                  </p>
                  <p>(нужно прислать скриншот с комментарием или сообщением, который это подтверждает)</p>
                  <p>Если вы заходите в курс до 1 мая, для вас действует скидка 16%.</p>
                  <p>Если кажется, что вы попадаете под скидку, но не уверены — просто напишите мне, разберемся.</p>
                </SectionText>
                <div className="mt-8">
                  <SmoothAnchorButton href={links.ask}>Уточнить скидку</SmoothAnchorButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 rounded-[2.25rem] border border-black/8 bg-white px-6 py-8 shadow-[0_12px_45px_rgba(0,0,0,0.03)] sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] lg:items-center lg:gap-14 lg:px-10 xl:px-14">
            <Reveal>
              <div className="max-w-3xl">
                <SectionEyebrow>У меня нет деняк</SectionEyebrow>
                <SectionText className="max-w-2xl">
                  <p>Честно говоря, я не хочу подключать никакие рассрочки.</p>
                  <p>
                    В моих интересах сделать так, чтобы ваше финансовое состояние со временем улучшилось, и когда-нибудь вы
                    пришли ко мне за платным курсом. Поэтому я подготовлю список материалов, с которых можно начать свой
                    путь.
                  </p>
                  <p>
                    Изучив их, вы сможете разобраться в монтаже, нейросетях и сделаете первые шаги к заработку на этих
                    навыках.
                  </p>
                  <p>Да, потребуется больше времени, терпения, усидчивости и самостоятельности.</p>
                  <p>Но зато это бесплатно.</p>
                  <p>Просто тыкайте на кнопку и забирайте файл с инструкцией.</p>
                </SectionText>
                <div className="mt-8">
                  <SmoothAnchorButton href={links.freeDoc}>Забрать бесплатный файл</SmoothAnchorButton>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative mx-auto w-full max-w-[420px] lg:ml-auto lg:translate-x-4 xl:translate-x-8">
                <AccentImage src={images.noMoney} alt="Иллюстрация к блоку с бесплатным материалом" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-16 lg:pt-32">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="max-w-3xl">
                <SectionEyebrow>Контакты</SectionEyebrow>
                <SectionTitle large>Если хотите купить курс, задать вопрос или просто уточнить, подойдет ли он вам, пишите мне сюда:</SectionTitle>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.75rem] border border-black/8 bg-white p-6 transition duration-300 hover:border-black/14 hover:bg-[#f7f7f4] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className="text-[11px] uppercase tracking-[0.24em] text-black/35">Контакты</div>
                  <div className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[#111111]">Telegram</div>
                  <div className="mt-3 text-black/52">Написать в личку</div>
                </a>

                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.75rem] border border-black/8 bg-white p-6 transition duration-300 hover:border-black/14 hover:bg-[#f7f7f4] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className="text-[11px] uppercase tracking-[0.24em] text-black/35">Контакты</div>
                  <div className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[#111111]">Instagram</div>
                  <div className="mt-3 text-black/52">Открыть профиль</div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-black/8 pt-5 text-sm text-black/34">
          <div>Этот маленький сайтик мы сделали вместе с ChatGPT</div>
        </div>
      </footer>
    </div>
  );
}