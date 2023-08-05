import FormikTextInput from "./components/sharedComponents/FormikTextInput/FormikTextInput";

export default function Test() {
  return (
    <div className="Test">
      <FormikTextInput handleSubmit={(values)=>console.log(values)} />
    </div>
  );
}
