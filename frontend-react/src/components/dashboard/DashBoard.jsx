import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const DashBoard = () => {
  const [ticker, setTicker] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState("")
  const [ma100, setMa100] = useState('')
  const [ma200, setMa200] = useState('')
  const [finalPrediction, setFinalPrediction] = useState('')
  const [mse, setMse] = useState('')
  const [r2score, setR2score] = useState('')
  const [rmse, setRmse] = useState('')
  const [currentPrice, setCurrentPrice] = useState("")
  const [predictedPrice, setPredictedPrice] = useState('')
  const [signal, setSignal] = useState("")
  const [confidence, setConfidenScore] = useState('')


  const fetchProtectedData = async () => {
    try {
      const response = await axiosInstance.get('/protected-view/')
      // console.log("success: ", response.data);
    } catch (err) {
      console.error("error fetching data:", err);
    }
  }


  useEffect(() => {
    fetchProtectedData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      ticker: ticker
    }

    try {
      const response = await axiosInstance.post("/predict/", data)

      if (response.data.error) {
        setError(response.data.error)

        setPlot('')
        setMa100('')
        setMa200('')
        setFinalPrediction('')
        setMse('')
        setR2score('')
        setRmse('')
        setCurrentPrice('')
        setPredictedPrice('')
        setSignal('')
        setConfidenScore('')

        return
      }

      // ✅ No error → set data
      setError("")

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl = `${backendRoot}${response.data.plot_img}`
      const ma100url = `${backendRoot}${response.data.plt_100_ma}`
      const ma200url = `${backendRoot}${response.data.plt_200_ma}`
      const finalPredictionuRL = `${backendRoot}${response.data.plt_final_prediction}`
      const mse = response.data.mse
      const r2 = response.data.r2

      setPlot(plotUrl)
      setMa100(ma100url)
      setMa200(ma200url)
      setFinalPrediction(finalPredictionuRL)
      setMse(mse)
      setR2score(r2)
      setRmse(response.data.rmse)
      setCurrentPrice(response.data.current_price)
      setPredictedPrice(response.data.predicted_price)
      setSignal(response.data.signal)
      setConfidenScore(response.data.confidence_score)

      // console.log(plotUrl);
      console.log(response.data)

    } catch (err) {
      console.error("there was an error making the  API request", err);
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="Enter Stock Ticker" onChange={(e) => setTicker(e.target.value)} required />
            
            {error && (
              <div className="alert alert-danger mt-4 text-center shadow">
                ⚠ {error}
              </div>
            )}

            {loading ? (
              <button type='submit' className='btn btn-info mt-3' disabled> <FontAwesomeIcon icon={faSpinner} spin />please wait....</button>
            ) : (
              <button type="submit" className="btn btn-info mt-3">See Prediction</button>
            )}

          </form>
        </div>

        {!error && signal && (
          <div className="card shadow-lg p-4 mt-4 text-center">
            <h3 className="fw-bold mb-3">{ticker.toUpperCase()} AI Prediction</h3>

            <p className="fs-5">
              <strong>Current Price:</strong> ₹{currentPrice}
            </p>

            <p className="fs-5">
              <strong>Predicted Price:</strong> ₹{predictedPrice}
            </p>

            <p className="fs-5">
              <strong>Signal:</strong>{" "}
              {signal === "BUY" ? (
                <span className="text-success fw-bold">📈 BUY</span>
              ) : (
                <span className="text-danger fw-bold">📉 SELL</span>
              )}
            </p>

            <p className="fs-5">
              <strong>Confidence:</strong> {confidence}%
            </p>
          </div>
        )}

        {!error && finalPrediction && (
          <>
            <div className="prediction mt-5">
              <div className="p-3">
                {plot && (
                  <img src={plot} style={{ maxWidth: "100%" }} />
                )}
              </div>
            </div>

            <div className="prediction mt-6">
              <div className="p-3">
                {ma100 && (
                  <img src={ma100} style={{ maxWidth: "100%" }} />
                )}
              </div>
            </div>


            <div className="prediction mt-6">
              <div className="p-3">
                {ma200 && (
                  <img src={ma200} style={{ maxWidth: "100%" }} />
                )}
              </div>
            </div>

            <div className="prediction mt-6">
              <div className="p-3">
                {finalPrediction && (
                  <img src={finalPrediction} style={{ maxWidth: "100%" }} />
                )}
              </div>
            </div>

            <div className="card shadow-lg bg-dark text-light p-4 mt-4 rounded">
              <h4 className="text-center text-info fw-bold mb-3">
                Model Evaluation
              </h4>

              <p className="fs-5">
                <span className="fw-semibold">Mean Squared Error:</span> {mse}
              </p>

              <p className="fs-5">
                <span className="fw-semibold">Root Mean Squared Error:</span> {rmse}
              </p>

              <p className="fs-5">
                <span className="fw-semibold">R² Score:</span>{" "}
                {(r2score * 100).toFixed(2)}%
              </p>
            </div>

          </>
        )}



      </div>
    </div>
  )
}

export default DashBoard
