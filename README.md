# Organization_manager

Реализация веб-приложения для управления списком организаций

Используемые технологии:
1. Фреймфорк - VueJS v3
2. Библиотеки - Vuetify, Pinia, Axios, Vue Router
3. Инструменты - Vite

# Project overview

В проекте реализрованы два основных компонента.

## OrganizationTable.vue

Является страницей отображения списка организаций.

Реализованные список организаций, сортировка и пагинация хранятся в Pinia.

### Демонстрация
1. Сортировка по полю id с pageSize = 10


![sortById example](/screenshots/sortById.png?raw=true "sortById example")

2. Сортировка по полю id с pageSize = 5 и page=2


![sortByIdWithPagination example](/screenshots/sortByIdWithPagination.png?raw=true "sortByIdWithPagination example")

3. Сортировка по полю name


![sortByName example](/screenshots/sortByName.png?raw=true "sortByName example")


## AddOrganization.vue

Является страницей для добавления новой организации.

Реализовано добавление изображения к организации.

Реализована валидация по нескольким параметрам для всех полей, в том числе для изображения.


### Демонстрация
1. Валидация формы


![validationForm example](/screenshots/validationForm.png?raw=true "validationForm example")

2. Добавление новой организации


![addOrganization example](/screenshots/addOrganization.png?raw=true "addOrganization example")

3. Список организаций после добавления


![organizationTableAfterAdd example](/screenshots/organizationTableAfterAdd.png?raw=true "organizationTableAfterAdd example")

4. Api после добавления


![apiAfterAdd example](/screenshots/apiAfterAdd.png?raw=true "apiAfterAdd example")
# How to run

### Install requirements

1. Node.js (версия 18.x или выше)
2. npm или yarn

### Installation and Development

1. Клонируйте репозиторий:

```git clone https://github.com/kanaevaNat/organization_manager.git```

2. Перейдите в папку проекта:

```cd organization_manager```

3. Установите зависимости:

```
npm install
# или
yarn install
```

4. Запустите локальный сервер:

```
npm run dev
# или
yarn dev
```