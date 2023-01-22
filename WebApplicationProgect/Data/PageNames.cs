using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationProgect.Data
{       
    public class PageNames
    {
        /// <summary>
        /// Не изменять!!!
        /// Содержит названия страниц отображаемых  в header меню страницы _Layout.
        /// Каждому названию соответсвуют файлы:
        /// название.cshtml-html страница
        /// название.css - стили для страницы
        /// название.js - скрипты для страницы
        /// </summary>
        public static readonly string[] PageName = new string[]
        {
            //"Тарифы",
            "Наши достижения",
            "Отзывы",
           // "Контакты",
           "О разработчиках",
            "Чат",
            "О чате"
        };
        public static int GetPagePos(string v)
        {

            for (int i = 0; i < PageName.Length; i++)
                if (PageName[i] == v)
                    return i;

            return -1;
        }
    }
}
