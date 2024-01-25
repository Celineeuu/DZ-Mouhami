import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          // Ajoutez les traductions en français ici
        },
      },
      ar: {
        translation: {
          'Répertoire d’avocats expérimentés':'دليل المحامين ذوي الخبرة',
          'à votre service':'في خدمتكم',
          'Explorez notre vaste annuaire d avocats qualifiés prêts à vous aider dans votre parcours juridique.':'استكشفوا دليلنا الواسع للمحامين المؤهلين الجاهزين لمساعدتكم في رحلتكم القانونية',
          'Rechercher':'البحث',
          'SERVICES':'خدمات',
          'NOS':'نقدمها',
          'Chercher':'البحث',
          'Trouvez rapidement l avocat idéal en utilisant notre barre de recherche . Filtrez par région et spécialité pour des résultats précis.':'ابحثوا بسرعة عن المحامين المثاليين باستخدام شريط البحث لدينا. قوموا بتصفية النتائج حسب المنطقة والتخصص للحصول على نتائج دقيقة.',
          'Contacter':'التواصل',
          'Comparer':'المقارنة'
        },
      },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
