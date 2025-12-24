import { Application, Container, Graphics, TilingSprite, Assets, WRAP_MODES, Sprite, TextStyle, Text } from "pixi.js";

const app = new Application()
await app.init({
    resizeTo: window,
    backgroundColor: "#775a2322",
});
document.body.appendChild(app.canvas);

window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

function easeInSine(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}

const texture = await Assets.load("./sprites/885.jpg");
texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;

const deskTexture = await Assets.load("./sprites/desk.png");

const signTexture = await Assets.load("./sprites/sign.png");
const plasticTexture = await Assets.load("./sprites/3.png");
const metallTexture = await Assets.load("./sprites/1.png");
const paperTexture = await Assets.load("./sprites/2.png");

const correct = await Assets.load("./sprites/correct.png");
const inCorrect = await Assets.load("./sprites/incorrect.png");

const textures = [plasticTexture, metallTexture, paperTexture];
const trashA: Sprite[] = []






const bg = new TilingSprite({
  texture,
  width: window.innerWidth,
  height: window.innerHeight
});
bg.tileScale.set(0.1, 0.1);
bg.position.set(0, 0);
bg.zIndex = -1;
app.stage.addChild(bg);

const textStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    fill: "#ffffffcc",
});

const textStyle2 = new TextStyle({
    fontFamily: "Arial",
    fontSize: 35,
    fill: "#ffffff",
    fontWeight: "bold",
    align: "center",
    wordWrap: true,
    wordWrapWidth: window.innerWidth * 0.8
});

const textStyle3 = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 50,
    fontWeight: 'bold',
    fill: "#240e0eff",
});

const bg1 = new Graphics()
bg1.beginFill("#240e0eff");
bg1.drawRect(0, -window.innerHeight / 2, window.innerWidth, window.innerHeight);
bg1.endFill();
bg1.zIndex = 1000
app.stage.addChild(bg1);

const bg2 = new Graphics()
bg2.beginFill("#240e0eff");
bg2.drawRect(0, window.innerHeight / 2, window.innerWidth, window.innerHeight);
bg2.endFill();
bg2.zIndex = 1000
app.stage.addChild(bg2);

const bgText = new Text(
`The game "Sorting garbage"\n` +
`Student: Ramazanov Emir\n` +
`The goal of the game is to learn how to sort waste by type: plastic, paper, metal.\n`+
`Click "Start" to start the game.`,
    textStyle2
);

bgText.anchor.set(0.5);
bgText.position.set(window.innerWidth / 2, window.innerHeight / 3);
bgText.zIndex = 1001;
app.stage.addChild(bgText);


const bgButtonShadow = new Graphics();
bgButtonShadow.beginFill("#9b8f24ff");
bgButtonShadow.drawRoundedRect(0, 0, 300, 100, 30);
bgButtonShadow.endFill();
bgButtonShadow.position.set(window.innerWidth / 2 - bgButtonShadow.width / 2, window.innerHeight / 2 + 20);
bgButtonShadow.zIndex = 1001;
app.stage.addChild(bgButtonShadow);
const bgButton = new Graphics();
bgButton.beginFill("#c9b92bff");
bgButton.drawRoundedRect(0, 0, 300, 100, 30);
bgButton.endFill();
bgButton.position.set(window.innerWidth / 2 - bgButton.width / 2, window.innerHeight / 2);
bgButton.zIndex = 1001;
app.stage.addChild(bgButton);
const buttonText = new Text("START", textStyle3);
buttonText.position.set(window.innerWidth / 2 - buttonText.width / 2, window.innerHeight / 2 + 20);
buttonText.zIndex = 1001;
app.stage.addChild(buttonText);

let buttonPressed = false;
let buttonOffset = 0;
const buttonSpeed = 0.2;

bgButton.interactive = true;
bgButton.cursor = "pointer";

bgButton.on("pointerdown", () => {
    buttonPressed = true;
});
let buttonClick = false
bgButton.on("pointerup", () => {
    buttonPressed = false;
    buttonClick = true

    app.ticker.add(function startAnimation() {
        const speed = 10;
        bg1.y -= speed;
        bgText.y -= speed;
        bg2.y += speed;
        bgButton.y += speed;
        bgButtonShadow.y += speed;
        buttonText.y += speed;
        if (bg1.y + window.innerHeight < 0 && bg2.y > window.innerHeight) {
            app.ticker.remove(startAnimation);
        }
    });
});
bgButton.on("pointerupoutside", () => {
    buttonPressed = false;
});
app.ticker.add(() => {
  if(!buttonClick) {
      const target = buttonPressed ? 20 : 0;
      buttonOffset += (target - buttonOffset) * buttonSpeed;
      bgButton.position.y = window.innerHeight / 2 + buttonOffset;
      buttonText.position.y = window.innerHeight / 2 + 20 + buttonOffset;
    }
});

const container = new Container();
container.x = window.innerWidth / 2;
container.y = window.innerHeight / 2;
app.stage.addChild(container);

const desk = new Sprite(deskTexture);
desk.scale.set(0.8)
desk.position.set(window.innerWidth / 2 - window.innerWidth / 1.42, -25);
container.addChild(desk);

const trash1 = new Graphics();
trash1.beginFill("#425826ff");
trash1.drawRoundedRect(0, 0, 200, 300, 30);
trash1.endFill();
trash1.position.set(window.innerWidth / 2 - window.innerWidth / 1.42, -400);
container.addChild(trash1);

const trash1Bg1 = new Graphics();
trash1Bg1.beginFill("#394b21ff");
trash1Bg1.drawRoundedRect(0, 0, 200, 200, 30);
trash1Bg1.endFill();
trash1Bg1.position.set(window.innerWidth / 2 - window.innerWidth / 1.42, -400);
container.addChild(trash1Bg1);

const trash1Bg2 = new Graphics();
trash1Bg2.beginFill("#29331dff");
trash1Bg2.drawRoundedRect(20, 20, 160, 160, 20);
trash1Bg2.endFill();
trash1Bg2.position.set(window.innerWidth / 2 - window.innerWidth / 1.42, -400);
container.addChild(trash1Bg2);

const trash1Sign = new Sprite(signTexture);
trash1Sign.position.set(trash1.x + 70, -195);
container.addChild(trash1Sign);

const trash1Text = new Text("PLASTIC", textStyle);
trash1Text.position.set(trash1.x + 58, -135);
container.addChild(trash1Text);

const trash2 = new Graphics();
trash2.beginFill("#425826ff");
trash2.drawRoundedRect(0, 0, 200, 300, 30);
trash2.endFill();
trash2.position.set(window.innerWidth / 2 - window.innerWidth / 1.85, -400);
container.addChild(trash2);

const trash2Bg1 = new Graphics();
trash2Bg1.beginFill("#394b21ff");
trash2Bg1.drawRoundedRect(0, 0, 200, 200, 30);
trash2Bg1.endFill();
trash2Bg1.position.set(window.innerWidth / 2 - window.innerWidth / 1.85, -400);
container.addChild(trash2Bg1);

const trash2Bg2 = new Graphics();
trash2Bg2.beginFill("#29331dff");
trash2Bg2.drawRoundedRect(20, 20, 160, 160, 20);
trash2Bg2.endFill();
trash2Bg2.position.set(window.innerWidth / 2 - window.innerWidth / 1.85, -400);
container.addChild(trash2Bg2);

const trash2Sign = new Sprite(signTexture);
trash2Sign.position.set(trash2.x + 70, -195);
container.addChild(trash2Sign);

const trash2Text = new Text("PAPER", textStyle);
trash2Text.position.set(trash2.x + 65, -135);
container.addChild(trash2Text);

const trash3 = new Graphics();
trash3.beginFill("#425826ff");
trash3.drawRoundedRect(0, 0, 200, 300, 30);
trash3.endFill();
trash3.position.set(window.innerWidth / 2 - window.innerWidth / 2.6, -400);
container.addChild(trash3);

const trash3Bg1 = new Graphics();
trash3Bg1.beginFill("#394b21ff");
trash3Bg1.drawRoundedRect(0, 0, 200, 200, 30);
trash3Bg1.endFill();
trash3Bg1.position.set(window.innerWidth / 2 - window.innerWidth / 2.6, -400);
container.addChild(trash3Bg1);

const trash3Bg2 = new Graphics();
trash3Bg2.beginFill("#29331dff");
trash3Bg2.drawRoundedRect(20, 20, 160, 160, 20);
trash3Bg2.endFill();
trash3Bg2.position.set(window.innerWidth / 2 - window.innerWidth / 2.6, -400);
container.addChild(trash3Bg2);

const trash3Sign = new Sprite(signTexture);
trash3Sign.position.set(trash3.x + 70, -195);
container.addChild(trash3Sign);

const trash3Text = new Text("METALL", textStyle);
trash3Text.position.set(trash3.x + 62, -135);
container.addChild(trash3Text);

const trueText = new Text("TRUE", textStyle);
trueText.position.set(window.innerWidth / 2 - 100, window.innerHeight / 2 - 100);
trueText.alpha = 0;
app.stage.addChild(trueText);

const bins = [
    { container: trash1Bg2, type: "plastic" },
    { container: trash2Bg2, type: "paper" },
    { container: trash3Bg2, type: "metall" },
];

function showFeedback(isCorrect: boolean, x: number, y: number) {
    const feedbackTexture = isCorrect ? correct : inCorrect;
    const feedback = new Sprite(feedbackTexture);
    feedback.anchor.set(0.5);
    feedback.position.set(x, y);
    const feedbackScale = 0.3;
    feedback.scale.set(0);
    feedback.alpha = 0;
    container.addChild(feedback);

    let elapsed = 0;
    const duration = 500;

    app.ticker.add(function animateFeedback(delta) {
        elapsed += delta.deltaMS;

        if (elapsed <= duration / 2) {
            const t = elapsed / (duration / 2);
            const eased = easeInSine(t);
            feedback.alpha = eased;
            feedback.scale.set(eased * feedbackScale);
        } else if (elapsed <= duration) {
            const t = (elapsed - duration / 2) / (duration / 2);
            const eased = easeInSine(1 - t);
            feedback.alpha = eased;
            feedback.scale.set(eased * feedbackScale);
        } else {
            app.ticker.remove(animateFeedback);
            container.removeChild(feedback);
        }
    });
}

function createTrash() {
    const minDistance = 120;
    const spawnArea = { xMin: -380, xMax: 420, yMin: 100, yMax: 400 };
    let tries = 0;
    const maxTries = 50;

    while (tries < maxTries) {
        tries++;
        const randomX = Math.random() * (spawnArea.xMax - spawnArea.xMin) + spawnArea.xMin;
        const randomY = Math.random() * (spawnArea.yMax - spawnArea.yMin) + spawnArea.yMin;
        const randomTexture = textures[Math.floor(Math.random() * textures.length)];
        const randomRotation = Math.random() * Math.PI * 2;

        let overlap = false;
        for (let t of trashA) {
            const dx = t.x - randomX;
            const dy = t.y - randomY;
            if (Math.sqrt(dx*dx + dy*dy) < minDistance) {
                overlap = true;
                break;
            }
        }

        if (!overlap) {
            const trash: any = new Sprite(randomTexture);
            trash.anchor.set(0.5);
            trash.rotation = randomRotation;
            trash.scale.set(0.4);
            trash.position.set(randomX, randomY);
            trash.type = textures.indexOf(randomTexture) === 0 ? 'plastic' : textures.indexOf(randomTexture) === 1 ? 'metall' : 'paper';

            const startPos = { x: randomX, y: randomY };
            container.addChild(trash);
            trashA.push(trash);
            trash.interactive = true;
            trash.cursor = "pointer";

            let scaleTarget = 0.4;
            let scaleStart = 0.4;
            let scaleTime = 0;
            let scalingUp = false;
            let scalingDown = false;
            let dragging = false;
            let dragOffsetX = 0;
            let dragOffsetY = 0;
            let returning = false;
            let returnTime = 0;

            trash.on("pointerdown", (event: any) => {
                const pos = event.data.getLocalPosition(container);
                dragOffsetX = trash.x - pos.x;
                dragOffsetY = trash.y - pos.y;
                dragging = true;
                trash.zIndex = 1000;

                scaleStart = trash.scale.x;
                scaleTarget = 0.55;
                scaleTime = 0;
                scalingUp = true;
                scalingDown = false;
                returning = false;
            });

            trash.on("pointerup", (event: any) => {
                dragging = false;
                trash.zIndex = 0;
                const pointerPos = event.data.getLocalPosition(container);

                let matchedBin: any = null;
                for (let bin of bins) {
                    if (checkCollision(trash, [bin.container])) {
                        matchedBin = bin;
                        break;
                    }
                }

                if (matchedBin) {
                    if (matchedBin.type === trash.type) {
                        showFeedback(true, pointerPos.x, pointerPos.y);

                        let fadeTime = 0;
                        const fadeDuration = 300;
                        app.ticker.add(function fade(delta) {
                            fadeTime += delta.deltaMS;
                            const t = Math.min(fadeTime / fadeDuration, 1);
                            const eased = easeInSine(t);
                            trash.scale.set(0.4 * (1 - eased));
                            trash.alpha = 1 - eased;
                            if (t >= 1) {
                                app.ticker.remove(fade);
                                container.removeChild(trash);
                                trashA.splice(trashA.indexOf(trash), 1);
                            }
                        });
                    } else {
                        showFeedback(false, pointerPos.x, pointerPos.y);
                        returning = true;
                        returnTime = 0;
                    }
                } else {
                    returning = true;
                    returnTime = 0;
                }

                scaleStart = trash.scale.x;
                scaleTarget = 0.4;
                scaleTime = 0;
                scalingUp = false;
                scalingDown = true;
            });

            trash.on("pointerupoutside", () => {
                dragging = false;
                trash.zIndex = 0;
                returning = true;
                returnTime = 0;
                scaleStart = trash.scale.x;
                scaleTarget = 0.4;
                scaleTime = 0;
                scalingUp = false;
                scalingDown = true;
            });

            trash.on("pointermove", (event: any) => {
                if (dragging) {
                    const pos = event.data.getLocalPosition(container);
                    trash.x = pos.x + dragOffsetX;
                    trash.y = pos.y + dragOffsetY;
                }
            });

            app.ticker.add((delta) => {
                if (scalingUp || scalingDown) {
                    scaleTime += delta.deltaMS / 30;
                    const t = Math.min(scaleTime, 1);
                    const eased = easeInSine(t);
                    const newScale = scaleStart + (scaleTarget - scaleStart) * eased;
                    trash.scale.set(newScale);
                    if (t >= 1) scalingUp = false, scalingDown = false;
                }

                if (returning) {
                    returnTime += delta.deltaMS / 60;
                    const t = Math.min(returnTime, 1);
                    const eased = easeInSine(t);
                    trash.x = trash.x + (startPos.x - trash.x) * eased;
                    trash.y = trash.y + (startPos.y - trash.y) * eased;
                    if (t >= 1) returning = false;
                }
            });

            break;
        }
    }
}

function checkCollision(sprite: any, bins: any) {
  for (let bin of bins) {
    const boundsA = sprite.getBounds();
    const boundsB = bin.getBounds();
    if (
      boundsA.x + boundsA.width > boundsB.x &&
      boundsA.x < boundsB.x + boundsB.width &&
      boundsA.y + boundsA.height > boundsB.y &&
      boundsA.y < boundsB.y + boundsB.height
    ) {
      return true;
    }
  }
  return false;
}




app.ticker.add(() => {
  if (trashA.length < 10) {
    createTrash();
  }
});

