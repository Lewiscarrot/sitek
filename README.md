# Visual Intelligence Landing

Готовый проект на Vite + React + Tailwind CSS, собранный из утвержденного финального кода без изменения структуры сайта, текстов, кнопок, секций и имен изображений.

## Структура проекта

```bash
visual-intelligence-site/
├─ public/
│  └─ images/
│     ├─ hero.png
│     ├─ story-main.png
│     ├─ story-rat.png
│     ├─ program.png
│     ├─ discounts.png
│     ├─ no-money.png
│     ├─ message-1.png
│     └─ message-2.png
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ netlify.toml
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Важно по изображениям

Сейчас в папке `public/images` лежат технические placeholder-файлы с теми же именами, которые уже используются в коде.

Перед публикацией финальной версии сайта замените их на свои реальные изображения, не меняя названия файлов:

- `hero.png`
- `story-main.png`
- `story-rat.png`
- `program.png`
- `discounts.png`
- `no-money.png`
- `message-1.png`
- `message-2.png`

## Локальный запуск

1. Установите Node.js 18 или 20.
2. Откройте терминал в папке проекта.
3. Выполните:

```bash
npm install
npm run dev
```

4. Откройте локальный адрес, который покажет Vite, обычно:

```bash
http://localhost:5173
```

## Локальная сборка

```bash
npm run build
```

После этого готовая сборка появится в папке `dist`.

Для локальной проверки production-версии:

```bash
npm run preview
```

## Деплой через GitHub + Netlify

### 1. Загрузите проект на GitHub

Создайте новый репозиторий и загрузите в него все файлы проекта.

Быстрый вариант через терминал:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПО.git
git push -u origin main
```

### 2. Импортируйте проект в Netlify

1. Зайдите в Netlify.
2. Нажмите **Add new site**.
3. Выберите **Import an existing project**.
4. Подключите GitHub.
5. Выберите нужный репозиторий.

### 3. Build settings для Netlify

Если Netlify не подставит их автоматически, укажите вручную:

- **Base directory:** оставить пустым
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `20`

Проект уже содержит `netlify.toml`, поэтому обычно этого достаточно.

## Что менять нельзя, чтобы не сломать текущую логику

- не переименовывать изображения;
- не переносить папку `public/images`;
- не менять пути вида `/images/...` в `src/App.tsx`, если вы просто заменяете картинки;
- не менять `publish directory` в Netlify.

## Что можно безопасно делать

- заменять placeholder-картинки на реальные;
- обновлять только содержимое папки `public/images`, если структура сайта остается той же;
- деплоить повторно через GitHub push.
