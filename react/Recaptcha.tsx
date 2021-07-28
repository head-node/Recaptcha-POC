import ReCAPTCHA from "react-google-recaptcha";


const Recaptcha = ({ setValue }: any) => {
  function onChange(value: any) {
    setValue(value)
  }

  return (
    <ReCAPTCHA
      sitekey="6LfFz20bAAAAALEFR-Fe8tjEBTV-du4Sk57dqIJ-"
      onChange={onChange}
    />
  )
}
export default Recaptcha
