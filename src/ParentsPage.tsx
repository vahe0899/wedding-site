import {motion, useScroll, useMotionValueEvent} from "framer-motion";
import "./App.scss";
import {useRef, useState} from "react";
import image from "./bg.webp";
import toast from "./toast.webp";
import cheese from "./cheese.webp";
import egg from "./egg.webp";
import ham from "./ham.webp";
import final from "./final.webp";
import logo from "./logo.webp";

function ParentsPage() {
  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const [hiddenTexts, setHiddenTexts] = useState<{[key: number]: boolean}>({});
  const [isImageBlurred, setIsImageBlurred] = useState(false);

  // Создаем refs для всех блоков
  const blockRefs: {[key: number]: React.RefObject<HTMLDivElement | null>} = {
    0: useRef<HTMLDivElement | null>(null),
    1: useRef<HTMLDivElement | null>(null),
    2: useRef<HTMLDivElement | null>(null),
    3: useRef<HTMLDivElement | null>(null),
    4: useRef<HTMLDivElement | null>(null),
    5: useRef<HTMLDivElement | null>(null),
    6: useRef<HTMLDivElement | null>(null),
  };

  // Добавляем ref для end-block
  const endBlockRef = useRef<HTMLDivElement | null>(null);

  const {scrollYProgress} = useScroll({
    target: firstSectionRef,
  });

  // Функция для отслеживания блока
  const useBlockTracker = (blockNumber: number) => {
    const {scrollYProgress: blockProgress} = useScroll({
      target: blockRefs[blockNumber],
      offset: ["start end", "start start"],
    });

    useMotionValueEvent(blockProgress, "change", (progress) => {
      console.log(`Block ${blockNumber} progress:`, progress);

      if (progress >= 0.9) {
        console.log(`🎉 Блок ${blockNumber} достиг самой высокой позиции!`);
        // Скрываем текст предыдущего блока
        if (blockNumber > 0) {
          setHiddenTexts((prev) => ({...prev, [blockNumber - 1]: true}));
        }

        // Размываем картинку когда первый блок (с тостом) достиг верха
        if (blockNumber === 1) {
          setIsImageBlurred(true);
          console.log("🔍 Размываем фоновую картинку!");
        }
      } else if (progress < 0.5) {
        // Показываем текст предыдущего блока обратно
        if (blockNumber > 0) {
          setHiddenTexts((prev) => ({...prev, [blockNumber - 1]: false}));
        }

        // Убираем размытие когда первый блок уходит вниз
        if (blockNumber === 1) {
          setIsImageBlurred(false);
        }
      }
    });
  };

  // Отслеживаем все блоки
  useBlockTracker(0);
  useBlockTracker(1);
  useBlockTracker(2);
  useBlockTracker(3);
  useBlockTracker(4);
  useBlockTracker(5);
  useBlockTracker(6);

  // Отслеживаем end-block для убирания блюра
  const {scrollYProgress: endBlockProgress} = useScroll({
    target: endBlockRef,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(endBlockProgress, "change", (progress) => {
    if (progress >= 0.5) {
      // Убираем блюр и масштабирование когда пользователь доходит до end-block
      setIsImageBlurred(false);
      console.log("✨ Убираем блюр и масштабирование для end-block!");
    } else if (progress < 0.5) {
      // Восстанавливаем блюр когда пользователь скроллит назад от end-block
      // Проверяем, что блок 1 (тост) все еще в активной позиции
      const block1Progress = blockRefs[1].current
        ? (window.scrollY -
            (blockRefs[1].current.offsetTop - window.innerHeight)) /
          window.innerHeight
        : 0;

      if (block1Progress >= 0.9) {
        setIsImageBlurred(true);
        console.log("🔍 Восстанавливаем блюр при скролле назад!");
      }
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    console.log("Overall progress:", progress);
  });

  return (
    <div className="container" ref={firstSectionRef}>
      <img
        src={image}
        alt="Background"
        className={`bg-image ${isImageBlurred ? "blurred" : ""}`}
      />

      {/* Контейнер для sticky блоков */}
      <div className="sticky-container">
        <div className="sticky-wrapper">
          {/* Блок 0 - Название сайта */}
          <div className="sticky-block block-0" ref={blockRefs[0]}>
            <div
              className="block-content"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <motion.h1
                animate={{
                  opacity: hiddenTexts[0] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Рецепт идеального праздника
              </motion.h1>
            </div>
          </div>

          {/* Блок 1 */}
          <div className="sticky-block block-1" ref={blockRefs[1]}>
            <div className="block-content">
              <img src={toast} alt="Toast" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[1] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 1
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[1] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Берёте ваши поздравления и&nbsp;адресуете их&nbsp;молодоженам,
                потому что 1 ноября 2025 года они официально станут семьей
              </motion.p>
            </div>
          </div>

          {/* Блок 2 */}
          <div className="sticky-block block-2" ref={blockRefs[2]}>
            <div className="block-content">
              <img src={cheese} alt="Cheese" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[2] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 2
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[2] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Вам предстоит 1 ноября к&nbsp;10:45 прийти в&nbsp;ЗАГС
                по&nbsp;адресу г.&nbsp;Красноярск ул.&nbsp;Мира, 24
                на&nbsp;официальную церемонию бракосочетания
              </motion.p>
            </div>
          </div>

          {/* Блок 3 */}
          <div className="sticky-block block-3" ref={blockRefs[3]}>
            <div className="block-content">
              <img src={ham} alt="Ham" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[3] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 3
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[3] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Приходите на&nbsp;наш праздник 1 ноября 2025 в&nbsp;18:00
                в&nbsp;ресторан &laquo;Дзе&raquo; по&nbsp;адресу
                г.&nbsp;Красноярск ул.&nbsp;Весны, 30
              </motion.p>
            </div>
          </div>

          {/* Блок 4 */}
          <div className="sticky-block block-4" ref={blockRefs[4]}>
            <div className="block-content">
              <img src={toast} alt="Toast" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[4] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 4
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[4] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Не&nbsp;парьтесь по&nbsp;поводу вашего образа. Приходите
                в&nbsp;своем лучшем образе, чтобы насладиться прекрасным вечером
                под бокал белого полусухого вина (ну&nbsp;или безалкогольных
                напитков).
              </motion.p>
            </div>
          </div>

          {/* Блок 5 */}
          <div className="sticky-block block-5" ref={blockRefs[5]}>
            <div className="block-content">
              <img src={cheese} alt="Cheese" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[5] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 5
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[5] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                В&nbsp;нашем рецепте счастья именно вы&nbsp;&mdash; главный
                ингредиент. Спасибо, что всегда были рядом и&nbsp;теперь сможете
                разделить с&nbsp;нами этот день.
              </motion.p>
            </div>
          </div>

          {/* Блок 6 */}
          <div className="sticky-block block-6" ref={blockRefs[6]}>
            <div className="block-content">
              <img src={egg} alt="Egg" className="food-img" />
              <motion.h2
                animate={{
                  opacity: hiddenTexts[6] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Шаг 6
              </motion.h2>
              <motion.p
                animate={{
                  opacity: hiddenTexts[6] ? 0 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                Не&nbsp;забудьте взять с&nbsp;собой классное настроение
                и&nbsp;принять приглашение/ отказаться (фу)
              </motion.p>
            </div>
          </div>
          <div className="final-block">
            <h3 className="final-title">Почему croque-madame?</h3>
            <div className="final-img-container">
              <img src={final} alt="Final" className="final-img" />
              <img src={logo} alt="logo" className="logo-img" />
              <div className="final-img-text-left">
                <svg className="circle" viewBox="0 0 100 100">
                  <path id="circle" d="M 0,75 a 75,75 0 1,1 0,1 z" />
                  <text>
                    <textPath className="circle-text" xlinkHref="#circle">
                      это наше любимое блюдо
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="final-img-text-right">
                <svg className="circle" viewBox="0 0 80 80">
                  <path id="circle" d="M 0,80 a 80,80 0 1,1 0,1 z" />
                  <text>
                    <textPath className="circle-text" xlinkHref="#circle">
                      в espresso season
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="final-content">
              Croque-madame можно попробовать в&nbsp;Екатеринбурге,
              но&nbsp;только в&nbsp;Красноярске получится сделать его
              по&nbsp;нашему рецепту&nbsp;&mdash; с&nbsp;любовью, друзьями
              и&nbsp;преисполненными счастьем!
            </div>
          </div>
          <div className="end-block" ref={endBlockRef}>
            <h1 className="end-title">Будем ждать!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentsPage;
