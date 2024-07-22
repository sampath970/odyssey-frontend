"use client";
import { useRouter } from "next/navigation";
import Button from "../../../components/button/button";
import "./footer.scss";

export function Footer({setShowEditor}) {
  return (
    // <div className="form-mapping__footer">
      <Button
        btnText={"+ Add More Files"}
        btnTheme="secondary"
        btnType="outline"
        buttonClick={()=>setShowEditor(true)}
      />
  );
}
