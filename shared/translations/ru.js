import { config } from '../config'

const APP_NAME = config.APP_NAME

export const ru = {
    Error_WrongOAuth2Token: 'Неправильный OAuth2 код',
    Error_AuthFailed: 'При авторизации возникла ошибка',
    Error_ActionForbidden: 'Действие запрещено',
    Error_NoUserWithLogin: 'Пользователя с таким логином не существует',
    Error_WrongPassword: 'Неправильный пароль',
    Error_InvalidLogin: 'Некорректный логин (минимум 4 символа)',
    Error_LoginIsTooShort: 'Минимальная длина логина - 4 символа',
    Error_PasswordIsTooShort: 'Минимальная длина пароля - 6 символов',
    Error_InvalidPassword: 'Некорректный пароль (минимум 6 символов)',
    Error_NotUniqueLogin: 'Пользователь с таким логином уже зарегистрирован в системе',
    Error_LoginCantBeEmpty: 'Логин не может быть пустым',
    Error_PasswordsAreNotIdentical: 'Пароли не совпадают',
    Error_BadRequest: 'Неправильный запрос',
    Error_QuestsReplacingFailed: 'При обновлении квестов произошла ошибка',
    Error_QuestsFetchingFailed: 'При загрузке квестов произошла ошибка',
    Error_QuestReplacingFailed: 'Не удалось заменить квест',
    Error_QuestFinalizationFailed: 'Не удалось получить награду. Проверьте, запущена ли игра',
    Error_LocaleIsNotSupported: 'Не поддерживаемый язык',
    Error_ThemeIsNotSupported: 'Не поддерживаемая тема',
    Error_WrongDiscordTag: 'Не корректный Discord тег',
    Error_WrongDisplayName: 'Не корректное отображаемое имя',
    Error_WrongSteamAccountURL: 'Не корректная ссылка профиля Steam',
    Error_WrongSteamTradeURL: 'Не корректная ссылка обмена Steam',
    Error_WrongAvatarId: 'Не корректный аватар',

    Success_QuestReplacing: 'Квест заменён',
    Success_QuestFinalization: 'Награда за квест получена',

    Login_WelcomeBack: 'Добро пожаловать!',
    Login_SignInToContinue: `Войдите в Ваш ${APP_NAME} аккаунт`,
    Login_LoginInputTitle: 'Логин',
    Login_LoginInputPlaceholder: 'Введите логин',
    Login_PasswordInputTitle: 'Пароль',
    Login_PasswordInputPlaceholder: 'Введите пароль',
    Login_LoginButtonTitle: 'Войти',
    Login_DontHaveAccount: 'Нет аккаунта?',
    Login_SignUpLinkTitle: 'Зарегистрироваться',

    Register_FreeRegister: 'Регистрация профиля',
    Register_GetFreeAccount: `Создайте аккаунт ${APP_NAME} прямо сейчас`,
    Register_RepeatPassword: 'Повторите пароль',
    Register_AlreadyHaveAccount: 'Уже есть аккаунт?',
    Register_SignInLinkTitle: 'Войти',
    Register_RegisterButtonTitle: 'Создать',
    Register_LoginInputHelp: 'Минимальная длина - 4 символа',
    Register_PasswordInputHelp: 'Минимальная длина - 6 символов',

    MainMenu_MyMarket: 'Мой маркет',
    MainMenu_MyWishlist: 'Список желаний',
    MainMenu_Profiles: 'Профили',
    MainMenu_Items: 'Предметы',
    MainMenu_Quests: 'Квесты',
    MainMenu_Settings: 'Настройки',

    RegisterPrompt: 'Зарегистрироваться',
    CraftedBy: 'Сделано для комьюнити Witch It от !D',
    Logout: 'Выйти',
    Settings: 'Настройки',
    Yes: 'Да',
    No: 'Нет',
    Hide: 'Скрыть',
    Unhide: 'Показать',
    Delete: 'Удалить',
    Confirm: 'Подтвердить',
    Cancel: 'Отменить',
    Change: 'Изменить',

    Quests_Play40Rounds_B: 'Сыграть 40 раундов Mobification',
    Quests_Play8Rounds_B: 'Сыграть 8 раундов Mobification',
    Quests_Win3Rounds_B: 'Выиграть 3 раундов Mobification',
    Quests_Win15Rounds_B: 'Выиграть 15 раундов Mobification',
    Quests_Win5Rounds_D: 'Выиграть 5 раундов Imposturous',
    Quests_Win1Rounds_D: 'Выиграть 1 раунд Imposturous',
    Quests_Play15Rounds_D: 'Сыграть 15 раундов Imposturous',
    Quests_Play3Rounds_D: 'Сыграть 3 раунда Imposturous',
    Quests_Play8Rounds_C: 'Сыграть 8 раундов Hunt a Hag',
    Quests_Win3Rounds_C: 'Выиграть 3 раунда Hunt a Hag',
    Quests_Win15Rounds_C: 'Выиграть 15 раундов Hunt a Hag',
    Quests_Play40Rounds_C: 'Сыграть 40 раундов Hunt a Hag',
    Quests_Catch20Witches: 'Поймать 20 ведьм',
    Quests_Catch100Witches: 'Поймать 100 ведьм',
    Quests_Stomp15Witches: 'Нанести урон способностью "Body Slam" 15 раз',
    Quests_Stomp75Witches: 'Нанести урон способностью "Body Slam" 75 раз',
    Quests_Hook10Witches: 'Подцепить крюком 10 ведьм',
    Quests_Hook50Witches: 'Подцепить крюком 50 ведьм',
    Quests_Play40Rounds_A: 'Сыграть 40 раундов Hide and Seek',
    Quests_Play8Rounds_A: 'Сыграть 8 раундов Hide and Seek',
    Quests_Win3Rounds_A: 'Выиграть 3 раунда Hide and Seek',
    Quests_Win15Rounds_A: 'Выиграть 15 раундов Hide and Seek',

    Quests_UpdateQuests: 'Обновить данные квестов',
    Quests_UpdateAvailableIn: 'Следующее обновление доступно через: %s',
    Quests_WeeklyQuestsTitle: 'Еженедельные квесты',
    Quests_DailyQuestsTitle: 'Ежедневные квесты',
    Quests_UpdateQuest: 'Заменить',
    Quests_GetReward: 'Получить награду',
    Quests_LastUpdate: 'Последнее обновление: %s',
    Quests_NoQuests: 'Нет активных квестов',
    Quests_WannaReplaceQuest: 'Вы действительно хотите заменить этот квест?',
    Quests_UndoneAction: 'Это действие нельзя отменить!',
    Quests_ReplaceQuestTitle: 'Замена квеста',
    Quests_ReplaceQuestConfirmButtonTitle: 'Заменить',
    Quests_CancelButtonTitle: 'Отмена',
    Quests_FinalizeQuestTitle: 'Получение награды за квест',
    Quests_FinalizeQuestConfirmButtonTitle: 'Получить',
    Quests_FinalizeQuestNote: '<b>Действуют ограничения Steam/Witch It:</b> эта функция работает только при запущенной игре!',
    Quests_WannaFinalizeQuest: 'Вы действительно хотите получить награду за этот квест?',
    Quests_Note: 'Отслеживайте ваши ежедневные и еженедельные квесты, заменяйте их, контролируйте прогресс, получайте награду прямиком через сайт',
    Quests_FinalizationLimit: 'Действуют ограничения Steam/Witch It: получение награды возможно только при запущенной игре',
    Quests_Loading: 'Загрузка...',
    Quests_ConnectSteamWarning: 'Для использования этой функции необходимо подключить аккаунт Steam',
    Quests_ConnectSteamButtonTitle: 'Подключить аккаунт',

    Settings_NotSetWhenOauth: 'Невозможно изменить: авторизация через сторонний сервис',
    Settings_ProfileSettingsAndAppearance: 'Настройки профиля и внешний вид',
    Settings_DisplayName: 'Отображаемое имя',
    Settings_DisplayNamePlaceholder: 'Введите отображаемое имя профиля',
    Settings_ProfileAvatar: 'Аватар профиля',
    Settings_Save: 'Сохранить',
    Settings_SocialNetworks: 'Сторонние сервисы',
    Settings_Connect: 'Подключить',
    Settings_Disconnect: 'Отвязать',
    Settings_ProfileIsConnected: 'Профиль подключен',
    Settings_ProfileIsNotConnected: 'Профиль не подключен',
    Settings_SteamSettings: 'Данные профиля Steam',
    Settings_SteamAccountURL: 'Ссылка на профиль Steam',
    Settings_SteamTradeURL: 'Ссылка на обмен Steam',
    Settings_IsGuardProtected: 'Профиль защищен Steam Guard',
    Settings_DiscordSettings: 'Данные профиля Discord',
    Settings_DiscordName: 'Имя профиля Discord',
    Settings_DangerZone: 'Опасная зона',
    Settings_HideProfile: 'Скрытие профиля',
    Settings_ProfileIsHidden: 'Профиль приватный',
    Settings_ProfileIsVisible: 'Профиль публичный',
    Settings_DeleteProfile: 'Удаление профиля',
    Settings_DeleteProfileHint: 'Это действие невозможно отменить',
    Settings_AccountConnected: 'Аккаунт подключен',
    Settings_AccountDisconnected: 'Аккаунт отключен',
    Settings_SettingsUpdated: 'Настройки обновлены',
    Settings_PasswordFieldHint: 'Оставьте поле пустым, если не хотите изменять пароль',
    Settings_DisplayNameFieldHint: 'От 2 до 20 символов',
    Settings_DisconnectSocialTitle: 'Отвязать сервис',
    Settings_WannaDisconnectSocial: `Вы действительно хотите отвязать сторонний сервис от своего аккаунта ${APP_NAME}?<br>Вы больше не сможете войти в свой профиль используя этот сервис. Также некоторые функции сайта могут стать недоступными`,
    Settings_ConnectSocialDescription: `Привязка аккаунта стороннего сервиса к аккаунту ${APP_NAME} позволит вам входить на сайт с любого устройства используя аккаунт стороннего сервиса`,
    Settings_DisconnectSocialConfirmButtonTitle: 'Отвязать',
    Settings_ProfileIsPublic: 'Профиль активен',
    Settings_ProfileIsPrivate: 'Профиль скрыт',
    Settings_MakePrivate: 'Сделать приватным',
    Settings_MakePublic: 'Сделать публичным',
    Settings_MakePrivatePopupTitle: 'Сделать профиль приватным',
    Settings_WannaMakePrivate: 'Вы действительно хотите сделать ваш профиль приватным?<br>Ваш маркет и список желаний не будут доступными для других пользователей',
    Settings_MakePrivateConfirmButtonTitle: 'Подтвердить',
    Settings_ProfileVisibilityChanged: 'Видимость профиля изменена',
    Settings_RemoveProfileTitle: 'Удаление профиля',
    Settings_WannaRemoveProfile: 'Вы действительно хотите удалить ваш профиль?<br>Ваш маркет и список желаний будут безвозвратно удалены',

    Profiles_NoProfiles: 'Нет профилей',
    Profiles_SearchByUsername: 'Поиск пользователя по имени',
    Profiles_SteamGuardedOnly: 'Только пользователи со Steam Guard',

    Items_Filters_SearchPlaceholder: 'Поиск предмета по названию',
    Items_Filters_AnyRarity: 'Любая редкость',
    Items_Filters_Rarity: 'Редкость',
    Items_Filters_EventsSelected: 'Событий выбрано: %s',
    Items_Filters_AnyEvent: 'Любое событие',
    Items_Filters_SlotsSelected: 'Слотов выбрано: %s',
    Items_Filters_AnySlot: 'Любой слот',
    Items_Filters_OnlyTradeable: 'Только обмениваемые',
    Items_Filters_OnlyOwned: 'Только имеющиеся',

    Time_NMinutesAgo: (minutes) => {
        let word = ''
        const mod = minutes % 10

        if (minutes >= 10 && minutes <= 19) {
            word = 'минут'
        } else if (mod === 1) {
            word = 'минуту'
        } else if (mod >= 2 && mod <= 4) {
            word = 'минуты'
        } else {
            word = 'минут'
        }

        return `${minutes} ${word} назад`
    },
    Time_LessThanAMinuteAgo: 'менее минуты назад',
    Time_Never: 'никогда',

    OffersAvailable: (offersCount) => {
        let word = ''
        const mod = offersCount % 10

        if (offersCount >= 10 && offersCount <= 19) {
            word = 'предложений'
        } else if (mod === 1) {
            word = 'предложение'
        } else if (mod >= 2 && mod <= 4) {
            word = 'предложения'
        } else {
            word = 'предложений'
        }

        return `${offersCount} ${word}`
    }
}
