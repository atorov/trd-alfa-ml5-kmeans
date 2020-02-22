const p5Main = new p5((sketch) => {
    const s = sketch

    const FRAME_RATE = 60
    const K = 5
    const MAX_ITER = 100
    const THRESHOLD = 0.05

    let kmeans = null

    s.preload = () => { }

    s.setup = () => {
        s.createCanvas(640, 480)
        s.frameRate(FRAME_RATE)

        s.loadJSON('http://localhost:8080/scripts/data-prep/out/data.json', async (bundle) => {
            kmeans = await ml5.kmeans(bundle.data, {
                k: K,
                maxIter: MAX_ITER,
                threshold: THRESHOLD,
            }, () => {
                console.log('::: kmeans:', kmeans)
                for (let i = 0; i < K; i++) {
                    console.log(`::: centroid #${i}:`, kmeans.dataset.reduce((acc, item) => (item.centroid === i ? ++acc : acc), 0))
                }
            })
        })
    }

    s.draw = async () => {
        // ---------------------------------------------------------------------
        s.background(0)

        s.strokeWeight(1)
        s.stroke(127)
        s.noFill()
        s.rect(0, 0, s.width, s.height)

        // ---------------------------------------------------------------------
        // if (kmeans && kmeans.dataset) {
        //     TODO: ...
        // }
    }
}, 'p5-main')

window.p5Main = p5Main
