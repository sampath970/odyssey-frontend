import "./header.scss";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import { Footer } from "./footer";

export function Header(props) {
  const {setShowEditor} = props;
  const formStyle = {
    color: "white",
    margin: "0",
  };
  return (
    <div className="form-mapping__header">
        <Label
          type={LabelType.Body}
          text={"Echo Form Mapping"}
          variant={LabelVariant.L1}
          overrideTextStyles={formStyle}
        />
        <Footer setShowEditor={setShowEditor}/>
    </div>
  );
}
