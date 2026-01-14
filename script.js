const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

// Нежные цвета градиента
const gradientColors = [
	'#0c0c18',
	'#100c20',
	'#140c28',
	'#180c30',
	'#1c0c38',
	'#200c40',
	'#240c48',
	'#280c50',
]

class Particle {
	constructor() {
		this.reset()
	}

	reset() {
		this.x = Math.random() * canvas.width
		this.y = Math.random() * canvas.height
		this.size = Math.random() * 2 + 0.5
		this.speedX = (Math.random() - 0.5) * 0.8
		this.speedY = (Math.random() - 0.5) * 0.8
		// Нежные пастельные цвета
		const colors = [
			'rgba(110, 193, 255, 0.4)',
			'rgba(176, 102, 255, 0.4)',
			'rgba(255, 138, 200, 0.4)',
		]
		this.color = colors[Math.floor(Math.random() * colors.length)]
		this.life = 200 + Math.random() * 200
		this.originalLife = this.life
		this.waveOffset = Math.random() * Math.PI * 2
		this.waveAmplitude = Math.random() * 2
	}

	update() {
		this.waveOffset += 0.02
		this.x += this.speedX + Math.sin(this.waveOffset) * this.waveAmplitude
		this.y += this.speedY + Math.cos(this.waveOffset) * this.waveAmplitude
		this.life -= 0.5

		if (
			this.life <= 0 ||
			this.x < -50 ||
			this.x > canvas.width + 50 ||
			this.y < -50 ||
			this.y > canvas.height + 50
		) {
			this.reset()
		}
	}

	draw() {
		const opacity = (this.life / this.originalLife) * 0.4
		ctx.globalAlpha = opacity
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fill()

		// Мягкое свечение
		ctx.shadowColor = this.color
		ctx.shadowBlur = 20
		ctx.fill()
		ctx.shadowBlur = 0
		ctx.globalAlpha = 1
	}
}

const particles = []
for (let i = 0; i < 30; i++) {
	particles.push(new Particle())
}

function drawSteppedGradient() {
	const now = Date.now()
	const waveSpeed = 0.00005 // Очень медленная волна
	const waveOffset = (now * waveSpeed) % 1

	const steps = 6 // Меньше ступеней для более плавного перехода

	for (let i = 0; i < steps; i++) {
		const stepProgress = (i / steps + waveOffset) % 1
		const x = stepProgress * canvas.width * 2 - canvas.width * 0.5

		const gradient = ctx.createLinearGradient(
			x,
			0,
			x + canvas.width * 0.5,
			canvas.height * 0.8
		)

		const colorIndex1 = i % gradientColors.length
		const colorIndex2 = (i + 2) % gradientColors.length
		const colorIndex3 = (i + 4) % gradientColors.length

		gradient.addColorStop(0, gradientColors[colorIndex1])
		gradient.addColorStop(0.5, gradientColors[colorIndex2])
		gradient.addColorStop(1, gradientColors[colorIndex3])

		ctx.fillStyle = gradient
		ctx.globalAlpha = 0.4 // Полупрозрачные градиенты
		ctx.fillRect(x, 0, canvas.width * 0.5, canvas.height)
		ctx.globalAlpha = 1
	}
}

function animate() {
	// Плавное очищение canvas
	ctx.fillStyle = 'rgba(12, 12, 24, 0.1)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// Рисуем ступенчатый градиент
	drawSteppedGradient()

	// Рисуем частицы
	particles.forEach(p => {
		p.update()
		p.draw()
	})

	requestAnimationFrame(animate)
}

// Запускаем анимацию
animate()

// Добавляем градиентную анимацию к текстовым элементам при загрузке
document.addEventListener('DOMContentLoaded', function () {
	// Применяем анимацию к нужным элементам
	const elementsToAnimate = [
		'app-title',
		'current-week-text',
		'next-class-time',
		'time',
		'pair-number',
		'full-schedule-title',
		'full-schedule-day-header',
	]

	elementsToAnimate.forEach(id => {
		const element = document.getElementById(id)
		if (element) {
			element.classList.add('text-gradient-animation')
		}
	})

	// Обернем текст в заголовке в span для анимации
	const appTitle = document.querySelector('.app-title')
	if (appTitle) {
		appTitle.innerHTML = `<span class="gradient-text">${appTitle.textContent}</span>`
	}
})

// === ЛОГИКА РАСПИСАНИЯ ===
const schedule = {
	odd: {
		1: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'л.Сис.ПР',
				room: '1-113',
				teacher: 'Леонтьев Н.А.',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'пр.Разработка программных модулей',
				room: '1-303',
				teacher: 'Докторов',
			},
		],
		2: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.Иностранный язык в профессиональной деятельности',
				room: '1-225',
				teacher: 'асс. Балкарова А.К.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.Сис.ПР',
				room: '1-113',
				teacher: 'Леонтьев Н.А.',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'л.Сис.ПР',
				room: '1-303',
				teacher: 'Леонтьев Н.А.',
			},
		],
		3: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПОПД',
				room: '1-225',
				teacher: '-',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'л.ПОПД',
				room: '1-303',
				teacher: '-',
			},
		],
		4: [
			{
				num: 2,
				start: '13:10',
				end: '14:40',
				subject: 'л.РПМ',
				room: '1-303',
				teacher: 'Докторов',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'физра',
				room: '-',
				teacher: '-',
			},
			{
				num: 4,
				start: '13:10',
				end: '14:40',
				subject: 'л.РПМ',
				room: '1-115',
				teacher: 'Докторов',
			},
		],
		5: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-303',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.ПИТПМ',
				room: '1-303',
				teacher: 'Кочура А.Н.',
			},
		],
		6: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'пр.РПМ',
				room: '1-113',
				teacher: 'Докторов',
			},
		],
		7: [],
	},
	even: {
		1: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.Разработка программных модулей',
				room: '1-113',
				teacher: 'Докторов',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'л.Разработка программных модулей',
				room: '1-303',
				teacher: 'Докторов',
			},
		],
		2: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.Иностранный язык в профессиональной деятельности',
				room: '1-225',
				teacher: 'асс. Балкарова А.К.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.Сис.ПР',
				room: '1-113',
				teacher: 'Леонтьев Н.А.',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'л.Сис.ПР',
				room: '1-303',
				teacher: 'Леонтьев Н.А.',
			},
		],
		3: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПОПД',
				room: '1-225',
				teacher: '-',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'л.ПОПД',
				room: '1-303',
				teacher: '-',
			},
		],
		4: [
			{
				num: 2,
				start: '13:10',
				end: '14:40',
				subject: 'л.РПМ',
				room: '1-303',
				teacher: 'Докторов',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'физра',
				room: '-',
				teacher: '-',
			},
			{
				num: 4,
				start: '13:10',
				end: '14:40',
				subject: 'л.РПМ',
				room: '1-115',
				teacher: 'Докторов',
			},
		],
		5: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-303',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'л.ПИТПМ',
				room: '1-303',
				teacher: 'Кочура А.Н.',
			},
		],
		6: [
			{
				num: 1,
				start: '08:00',
				end: '09:30',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 2,
				start: '09:40',
				end: '11:10',
				subject: 'пр.ПИТПМ',
				room: '1-115',
				teacher: 'Кочура А.Н.',
			},
			{
				num: 3,
				start: '11:30',
				end: '13:00',
				subject: 'пр.РПМ',
				room: '1-113',
				teacher: 'Кочура А.Н.',
			},
		],
		7: [],
	},
}

// Функция для определения текущей недели по дате
function getCurrentWeekByDate() {
	const now = new Date()

	// Определяем дату начала семестра (пример: 2 сентября 2024 - понедельник, 1 неделя)
	// Замените эту дату на реальную дату начала вашего семестра
	const semesterStart = new Date('2024-09-02')

	// Вычисляем разницу в неделях от начала семестра
	const diffTime = now - semesterStart
	const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))

	// Четная/нечетная неделя (0 = нечетная, 1 = четная)
	return diffWeeks % 2 === 0 ? 'odd' : 'even'
}

let currentWeek = getCurrentWeekByDate()
let currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay()

// Функция для обновления отображения текущей недели
function updateCurrentWeekDisplay() {
	const weekText = currentWeek === 'odd' ? '1 НЕДЕЛЯ' : '2 НЕДЕЛЯ'
	document.getElementById('current-week-text').textContent = weekText

	// Обновляем активные кнопки во всех переключателях
	updateActiveWeekButtons()
}

// Функция для обновления активных кнопок недель
function updateActiveWeekButtons() {
	// Основной переключатель
	document.querySelectorAll('.week-btn').forEach(btn => {
		btn.classList.remove('active')
		if (btn.dataset.week === currentWeek) {
			btn.classList.add('active')
		}
	})

	// Переключатель в полном расписании
	document.querySelectorAll('.full-schedule-week-btn').forEach(btn => {
		btn.classList.remove('active')
		if (btn.dataset.week === currentWeek) {
			btn.classList.add('active')
		}
	})
}

// Вспомогательная функция для перевода времени в минуты
function timeToMinutes(timeStr) {
	const [h, m] = timeStr.split(':').map(Number)
	return h * 60 + m
}

// Функция для обновления блока "Следующая пара" - ТОЛЬКО следующая пара
function updateNextClass() {
	const now = new Date()
	const day = now.getDay() === 0 ? 7 : now.getDay()
	const currentTime = now.getHours() * 60 + now.getMinutes()

	const todaySchedule = schedule[currentWeek][day] || []
	const nextClassCard = document.querySelector('.next-class-card')

	if (todaySchedule.length === 0) {
		// Если сегодня нет пар
		nextClassCard.innerHTML = `
            <div class="next-class-header">
                <button class="next-class-btn">🎉 ОТДЫХ</button>
                <span class="next-class-time">--:--</span>
            </div>
            <div class="next-class-subject">Сегодня нет пар</div>
            <div class="next-class-room">Отдыхай!</div>
        `
		return
	}

	let nextLesson = null

	// Ищем ТОЛЬКО следующую пару (игнорируем текущую)
	for (const lesson of todaySchedule) {
		const start = timeToMinutes(lesson.start)

		if (currentTime < start) {
			nextLesson = lesson
			break // Нашли следующую пару - выходим
		}
	}

	if (nextLesson) {
		// Есть следующая пара
		nextClassCard.innerHTML = `
            <div class="next-class-header">
                <button class="next-class-btn">→ СЛЕДУЮЩАЯ</button>
                <span class="next-class-time">${nextLesson.start}–${nextLesson.end}</span>
            </div>
            <div class="next-class-subject">${nextLesson.subject}</div>
            <div class="next-class-room">${nextLesson.room} • ${nextLesson.teacher}</div>
        `
	} else {
		// Пары закончились или все прошли
		nextClassCard.innerHTML = `
            <div class="next-class-header">
                <button class="next-class-btn">✅ ЗАВЕРШЕНО</button>
                <span class="next-class-time">--:--</span>
            </div>
            <div class="next-class-subject">ЭТО ПОСЛЕДНЯЯ</div>
        `
	}
}

// Обновление времени каждую секунду
function updateClock() {
	const now = new Date()
	const hours = String(now.getHours()).padStart(2, '0')
	const minutes = String(now.getMinutes()).padStart(2, '0')
	document.getElementById('current-time').textContent = `${hours}:${minutes}`
	document.getElementById('current-date').textContent = now.toLocaleDateString(
		'ru-RU',
		{
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		}
	)

	// Обновляем блок "Следующая пара" каждую минуту
	if (now.getSeconds() === 0) {
		updateNextClass()
	}
}

// Переключение недель в основном интерфейсе
document.querySelectorAll('.week-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		currentWeek = btn.dataset.week
		updateCurrentWeekDisplay()
		update()
		updateNextClass()
	})
})

// Переключение недель в полном расписании
document.querySelectorAll('.full-schedule-week-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		currentWeek = btn.dataset.week
		updateCurrentWeekDisplay()
		renderFullSchedule(currentWeek, currentDay)
		updateNextClass()
	})
})

// Переключение дней
document.querySelectorAll('.full-schedule-day-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		document
			.querySelectorAll('.full-schedule-day-btn')
			.forEach(b => b.classList.remove('active'))
		btn.classList.add('active')
		currentDay = parseInt(btn.dataset.day)
		renderFullSchedule(currentWeek, currentDay)
	})
})

// Показать/скрыть полное расписание
const fullListBtn = document.querySelector('.full-list-btn')
const fullSchedulePanel = document.getElementById('full-schedule-panel')

fullListBtn.addEventListener('click', () => {
	fullSchedulePanel.classList.toggle('open')

	if (fullSchedulePanel.classList.contains('open')) {
		// При открытии синхронизируем активную неделю
		updateActiveWeekButtons()
		renderFullSchedule(currentWeek, currentDay)
	}
})

// Рендеринг пар на сегодня
function renderSchedule(day, currentTime) {
	const container = document.getElementById('schedule')
	container.innerHTML = ''

	const todaySchedule = schedule[currentWeek][day] || []

	if (todaySchedule.length === 0) {
		const emptyState = document.createElement('div')
		emptyState.className = 'empty-state'
		emptyState.innerHTML = `
            <div class="empty-icon">📚</div>
            <div>Сегодня нет пар</div>
            <div style="margin-top: 8px; font-size: 0.8rem; color: #888;">Отдыхай!</div>
        `
		container.appendChild(emptyState)
		return
	}

	let activeLesson = null
	for (const lesson of todaySchedule) {
		const start = timeToMinutes(lesson.start)
		const end = timeToMinutes(lesson.end)
		if (currentTime >= start && currentTime < end) {
			activeLesson = { ...lesson, startMinutes: start, endMinutes: end }
			break
		}
	}

	todaySchedule.forEach(lesson => {
		const isCurrent =
			activeLesson &&
			lesson.start === activeLesson.start &&
			lesson.end === activeLesson.end

		const card = document.createElement('div')
		card.className = 'class-card'
		if (isCurrent) card.classList.add('class-card--active')

		let innerHTML = `
            <div class="pair-number">${lesson.num} пара</div>
            <div class="time-range">${lesson.start}–${lesson.end}</div>
            <div class="subject">${lesson.subject}</div>
            <div class="details">
                <div class="room">${lesson.room}</div>
                <div class="teacher">${lesson.teacher}</div>
            </div>
        `

		if (isCurrent) {
			const elapsed = currentTime - activeLesson.startMinutes
			const total = activeLesson.endMinutes - activeLesson.startMinutes
			const progressPercent = Math.min(
				100,
				Math.max(0, (elapsed / total) * 100)
			)

			innerHTML = `
                <div class="status-badge">Сейчас</div>
                ${innerHTML}
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progressPercent.toFixed(
											1
										)}%;"></div>
                </div>
                <div class="progress-label">
                    <span>Начало</span>
                    <span>Конец</span>
                </div>
            `
		}

		card.innerHTML = innerHTML
		container.appendChild(card)
	})
}

// Рендеринг полного расписания
function renderFullSchedule(week, day) {
	const listContainer = document.getElementById('full-schedule-list')
	listContainer.innerHTML = ''

	const days = {
		1: 'Понедельник',
		2: 'Вторник',
		3: 'Среда',
		4: 'Четверг',
		5: 'Пятница',
		6: 'Суббота',
	}

	const daySchedule = schedule[week][day] || []
	if (daySchedule.length === 0) {
		const noClasses = document.createElement('div')
		noClasses.className = 'empty-state'
		noClasses.innerHTML = `
            <div class="empty-icon">📅</div>
            <div>${days[day]}</div>
            <div style="margin-top: 8px; font-size: 0.8rem; color: #888;">Нет пар</div>
        `
		listContainer.appendChild(noClasses)
		return
	}

	const dayHeader = document.createElement('div')
	dayHeader.className = 'full-schedule-day-header'
	dayHeader.textContent = days[day]
	listContainer.appendChild(dayHeader)

	daySchedule.forEach(lesson => {
		const card = document.createElement('div')
		card.className = 'full-schedule-class-card'

		card.innerHTML = `
            <div class="full-schedule-class-time">${lesson.start}–${lesson.end}</div>
            <div class="full-schedule-class-subject">${lesson.subject}</div>
            <div class="full-schedule-class-info">
                <span>${lesson.room}</span>
                <span>${lesson.teacher}</span>
            </div>
        `

		listContainer.appendChild(card)
	})
}

// Обновление данных
function update() {
	const now = new Date()
	const day = now.getDay() === 0 ? 7 : now.getDay()
	const hours = now.getHours()
	const minutes = now.getMinutes()
	const currentTime = hours * 60 + minutes

	renderSchedule(day, currentTime)
}

// При загрузке
document.addEventListener('DOMContentLoaded', () => {
	updateClock()
	updateCurrentWeekDisplay() // Инициализируем отображение недели
	update()
	updateNextClass()
	setInterval(update, 30000)
})

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(function (registration) {
				console.log('ServiceWorker зарегистрирован')
			})
			.catch(function (error) {
				console.log('Ошибка регистрации ServiceWorker:', error)
			})
	})
}
