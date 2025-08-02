import {motion, useScroll, useMotionValueEvent} from "framer-motion";
import "./App.scss";
import {useRef, useState} from "react";
import image from "./bg.jpg";
import toast from "./toast.png";
import cheese from "./cheese.png";
import egg from "./egg.png";
import ham from "./ham.png";

function App() {
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
                Приходите на&nbsp;before-party 31 октября 2025 в&nbsp;18:00
                в&nbsp;ресторан &laquo;Дзе&raquo; по&nbsp;адресу ул.&nbsp;Весны,
                30
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
                Помимо того, что приходите вовремя, нужно приготовить конкурс,
                связанный с&nbsp;молодоженами. В&nbsp;вашем распоряжении будет
                телевизор и&nbsp;ваши смартфоны, чтобы запечатлеть момент
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
                Не&nbsp;парьтесь по&nbsp;поводу вашего look-а (honestly,
                we&nbsp;don&rsquo;t give a&nbsp;fuck). Приходите в&nbsp;своем
                лучшем образе, чтобы насладиться прекрасным вечером
                среди&nbsp;друзей под бокал белого полусухого вина (ну&nbsp;или
                безалкогольных напитков)
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
                Этот этап идет последним и&nbsp;он&nbsp;самый важный! Вам
                предстоит 1 ноября к&nbsp;10:45 прийти в&nbsp;ЗАГС
                по&nbsp;адресу ул.&nbsp;Мира, 24 на&nbsp;официальную церемонию
                бракосочетания
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
        </div>
      </div>
    </div>
  );
}

export default App;
