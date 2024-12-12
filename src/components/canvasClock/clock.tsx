import moment from 'moment-timezone';
import "@/styles/clock.scss"

/**
 *
 * @param canvasHour canvas
 * @param canvas canvas
 * @param rt show id
 * @param times enum (Asia/Tokyo, Europe/London, Asia/Hong_Kong, America/New_York)
 * @param isOpen boolean
 */
export default function clocks(canvasHour: any , canvas: any, rt: any, times: any, isOpen : boolean) {
    const scale = window.devicePixelRatio;
    const size = 100;
    const angleMain = ((0 - 90) * Math.PI) / 180;
    // Инициализация холста и контекста
    const ctxHour = canvasHour.getContext('2d');


    canvasHour.width = size * scale;
    canvasHour.height = size * scale;
    ctxHour.scale(scale, scale);

    // Центр и радиус круга
    const centerHX = size / 2;
    const centerHY = size / 2;
    const radiusH = size / 2;

    // Количество линий (или меток) по окружности
    const numLines = 60;

    // Угловой шаг между линиями
    const angleStep = (2 * Math.PI) / 60;

    ctxHour.beginPath();
    ctxHour.fillStyle = '#fbfbfa';
    ctxHour.arc(radiusH, radiusH, radiusH, 0, Math.PI * 2);
    ctxHour.fill();

    // Функция для рисования циферблата и меток
    function drawClockFace() {
        // Рисуем метки
        ctxHour.lineWidth = 0.5;
        for (let i = 0; i < numLines; i++) {
            const angle = i * angleStep;
            const startX = centerHX + radiusH * Math.cos(angle);
            const startY = centerHY + radiusH * Math.sin(angle);
            const endX = centerHX + (radiusH - 5) * Math.cos(angle); // Длина линии 10 пикселей
            const endY = centerHY + (radiusH - 5) * Math.sin(angle); // Длина линии 10 пикселей

            ctxHour.beginPath();
            ctxHour.strokeStyle = '#2B2A28';
            ctxHour.moveTo(startX, startY);
            ctxHour.lineTo(endX, endY);
            ctxHour.stroke();
        }

        ctxHour.beginPath();
        ctxHour.arc(centerHX, centerHY, 6, 0, 2 * Math.PI);

        const currentTime = moment.tz(times);
        let hours = currentTime.hours();
        const ampm = hours >= 12 ? false : true;

        ctxHour.fillStyle = ampm ? '#5D977B' : '#FF3F32';
        ctxHour.fill();
    }

    // const canvas = document.getElementById('clockCanvas-2');
    const ctx = canvas.getContext('2d');

    canvas.width = size * scale;
    canvas.height = size * scale;
    ctx.scale(scale, scale);

    // Центр и радиус часов
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;


    // Функция для рисования стрелок
    function drawHands() {
        const currentTime = moment.tz(times);

        // const now = new Date();
        const seconds = currentTime.seconds();
        const minutes = currentTime.minutes();
        let hours = currentTime.hours();
        

        // const ampm = hours >= 12 ? 'PM' : 'AM';

        // hours = hours % 12;
        // hours = hours ? hours : 12;

        rt.innerText = `${hours}:${minutes < 10 ? '0' + minutes : minutes} H`;
        // rt.innerText = `${hours}:${minutes}H`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArrow('h', hours, minutes, seconds);
        drawArrow('m', hours, minutes, seconds);
        drawArrow('s', hours, minutes, seconds);

        requestAnimationFrame(drawHands);
    }

    // @ts-ignore
    function drawArrow(key, h, m, s) {
        // узнаем угол часа
        let timeAngle = 0;
        // const timeAngle = 360 / 12 * 2;

        // узнаем времени
        let angleHMS = 0;

        // Расстояние от центра круга до начальной точки линии
        let startOffset = 0;

        // Расстояние от центра круга до конечной точки линии
        let endOffset = 0;

        switch (key){
            case 'h':
                timeAngle = 360 / 12 * (h + m / 60);
                angleHMS = (timeAngle * Math.PI) / 180;
                startOffset = 22;
                endOffset = startOffset + 6;;
                break;
            case 'm':
                timeAngle = 360 / 60 * m;
                angleHMS = (timeAngle * Math.PI) / 180;
                startOffset = 13;
                endOffset = startOffset + 15;
                break;
            case 's':
                timeAngle = 360 / 60 * s;
                angleHMS = (timeAngle * Math.PI) / 180;
                startOffset = 1;
                endOffset = startOffset + 20;
                break;
        }

        // Начальные координаты линии
        const startX = centerX + (radius / 4 + startOffset) * Math.cos(angleHMS + angleMain);
        const startY = centerY + (radius / 4 + startOffset) * Math.sin(angleHMS + angleMain);

        // Конечные координаты линии
        const endX = centerX + (radius / 4 + endOffset) * Math.cos(angleHMS + angleMain);
        const endY = centerY + (radius / 4 + endOffset ) * Math.sin(angleHMS + angleMain);

        // Начать рисование секунды
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#292929';
        ctx.lineWidth = 1.5; // Толщина линии
        ctx.lineTo(endX, endY);
        ctx.stroke(); // Отрисовать линию
    }

    // Первоначальная отрисовка
    drawClockFace();
    drawHands();
}

// function getLineLength(x1, y1, x2, y2) {
//     const deltaX = x2 - x1;
//     const deltaY = y2 - y1;
//     return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
// }
