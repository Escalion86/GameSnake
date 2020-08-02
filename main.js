"use strict"

class Transport {
    constructor(type, maxSpeed, acceleration, wheelsCount, behavior) {
        console.log('Создан Transport');
        this.type = type;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.wheelsCount = wheelsCount;
        this.behavior = behavior;
        this.createDate = new Date();
    }

    timeForMaxSpeed = () => this.maxSpeed/this.acceleration;

    distanceForMaxSpeed = () => (this.acceleration * (this.timeForMaxSpeed() ** 2)) / 2;

    timeForDistance = (distance) => {
        let time = Math.sqrt(2 * distance / this.acceleration);
        if (time > this.timeForMaxSpeed()) {//Если расстояние НЕ будет пройдено раньше чем транспорт достигнет максимальной скорости
            //Сначала смотри время за которое автомобиль достигнет максимальной скорости
            //и добавляем время которое понадобится для преодоления дистанции на максимальной скорости (ускорения тут уже нет) за вычетом расстояния которое транспорт проедет до достижения максимальной скорости
            return this.timeForMaxSpeed() + (distance - this.distanceForMaxSpeed())/this.maxSpeed;
        } else {
            return time;
        }
    }
}

class Car extends Transport {
    constructor(maxSpeed, acceleration, wheelsCount, model, color) {
        super('Автомобиль', maxSpeed, acceleration, wheelsCount, 'Едет');
        this.model = model;
        this.color = color;
    }
}

class Plane extends Transport {
    constructor(maxSpeed, acceleration, wheelsCount, model, color) {
        super('Самолет', maxSpeed, acceleration, wheelsCount, 'Летает');
        this.maxAltitude = maxAltitude;
    }
}

class Boat extends Transport {
    constructor(maxSpeed, acceleration, wheelsCount, model, color) {
        super('Корабль', maxSpeed, acceleration, 0, 'Плавает');
    }
}

//Спрашиваем все данные у пользователя
const typeOfTransport = prompt('Укажите тип транспортного средства, где:\n1 - Автомобиль\n2 - Самолет\n3 - Корабль');
const maxSpeed = prompt('Укажите максимальную скорость в м/с');
const acceleration = prompt('Укажите ускорение в м/с2');

if (typeOfTransport === "1") {
    const model = prompt('Укажите модель');
    const color = prompt('Укажите цвет');
}
if (typeOfTransport === "2") {
    const maxAltitude = prompt('Укажите максимальную высоту полета');
}
if (typeOfTransport !== "3") {
    const wheelsCount = prompt('Укажите количество колес');
}


//Создаем транспорт
if (typeOfTransport === "1") {
    const transport = new Car(maxSpeed, acceleration, wheelsCount, model, color);
}
if (typeOfTransport === "2") {
    const transport = new Plane(maxSpeed, acceleration, wheelsCount, maxAltitude);
}
if (typeOfTransport === "3") {
    const transport = new Boat(maxSpeed, acceleration);
}

alert('Вы создали:' + transport.type + ';\n'
 + 'Время достижения максимальной скорости = ' + transport.timeForMaxSpeed() + ' секунд;\n'
 + 'Дистанция которая будет пройдена, до достижения максимальной скорости = ' + transport.distanceForMaxSpeed() + ' метров;\n'
 + '100м проедет за = ' + transport.timeForDistance(500) + ' секунд;\n');