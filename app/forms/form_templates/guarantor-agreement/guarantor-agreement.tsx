import React from 'react'
import "./guarantor-agreement.scss"
import { useRef } from 'react';
import MultiPagePdfGenerator from '../../../../components/export-form/export-form';
import Button from '../../../../components/button/button';


const guarantorAgreement = (props): any => {
    const pdfRef = useRef();
    const pdfRef1 = useRef();
    const pdfRef2 = useRef();
    const { FillFormData } = props;
    const handleDownloadClick = MultiPagePdfGenerator([pdfRef, pdfRef1, pdfRef2], "resident-notification-letter.pdf")

    return (
        <div id="guarantor-agreement">

            <title />
            <div id="sidebar">
                <div id="outline"></div>
            </div>
            <div className="form-download-button">
                <Button btnText={"Download"} buttonClick={handleDownloadClick} testID="download-button" />
            </div>
            <div id="page-container">
                <div id="pf1" className="pf w0 h0" data-page-no={1}>
                    <div className="pc pc1 w0 h0">
                        <img
                            className="bi x0 y0 w1 h1 image_layout_1"
                        />
                        <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x1 h2 y2 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x2 h3 y3 ff2 fs1 fc0 sc0 ls0 ws0">
                            {" "}
                            <span className="_ _0"> </span>GU
                            <span className="_ _1" />
                            AR
                            <span className="_ _1" />
                            AN
                            <span className="_ _1" />T<span className="_ _1" />Y{" "}
                            <span className="_ _1" />
                            <span className="ff3 fs2"> </span>
                        </div>
                        <div className="t m0 x1 h4 y4 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y5 ff3 fs2 fc0 sc0 ls0 ws0">
                            Thi
                            <span className="_ _1" />s G<span className="_ _1" />
                            ua
                            <span className="_ _1" />
                            rant
                            <span className="_ _1" />y <span className="_ _1" />
                            (“
                            <span className="_ _1" />
                            <span className="ff2">
                                Gua
                                <span className="_ _1" />r<span className="_ _1" />
                                ant
                                <span className="_ _1" />y
                                <span className="ff3">
                                    ”<span className="_ _1" />) d<span className="_ _1" />
                                    ate
                                    <span className="_ _1" />d{FillFormData("guarantor_date", "250px")}<span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /> is
                                    <span className="_ _1" /> mad
                                    <span className="_ _1" />e b<span className="_ _1" />y
                                    <span className="_ _1" />
                                    <span className="_ _1" />
                                    {FillFormData("guarantor_name", "554px")}
                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />
                                    (“
                                    <span className="_ _1" />
                                    <span className="ff2">
                                        Gua
                                        <span className="_ _1" />
                                        ran
                                        <span className="_ _1" />t<span className="_ _1" />
                                        or
                                        <span className="_ _1" />
                                        <span className="ff3">
                                            ”) i<span className="_ _1" />n f<span className="_ _1" />
                                            av
                                            <span className="_ _1" />
                                            or <span className="_ _1" />o<span className="_ _1" />f{" "}
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="t m0 x3 h5 y6 ff3 fs2 fc0 sc0 ls0 ws0">
                            Vis
                            <span className="_ _1" />
                            ta
                            <span className="_ _1" />
                            ra <span className="_"> </span>(“
                            <span className="_ _1" />
                            <span className="ff2">
                                Lan
                                <span className="_ _1" />
                                dl
                                <span className="_ _1" />
                                ord
                                <span className="_ _1" />
                                <span className="ff3">
                                    ”<span className="_ _1" />
                                    ). <span className="_"> </span> <span className="_"> </span>Land
                                    <span className="_ _1" />l<span className="_ _1" />
                                    or
                                    <span className="_ _1" />d <span className="_"> </span>and{" "}
                                    <span className="_"> </span>{FillFormData("name", "1150px")}
                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" />

                                    <span className="_ _1" /><span className="_ _1" />

                                    <span className="_ _1" /><span className="_"> </span>(“
                                    <span className="ff2">
                                        Ten
                                        <span className="_ _1" />
                                        an
                                        <span className="_ _1" />t
                                        <span className="ff3">
                                            ”<span className="_ _1" />){" "}
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="t m0 x3 h5 y7 ff3 fs2 fc0 sc0 ls0 ws0">
                            hav
                            <span className="_ _1" />e <span className="_ _2" />
                            ent
                            <span className="_ _1" />
                            er
                            <span className="_ _1" />
                            ed
                            <span className="_ _1" /> <span className="_ _3" />i
                            <span className="_ _1" />
                            nt
                            <span className="_ _1" />o <span className="_ _2" />a{" "}
                            <span className="_ _2" />
                            Resi
                            <span className="_ _1" />
                            de
                            <span className="_ _1" />
                            nt
                            <span className="_ _1" />
                            ial
                            <span className="_ _1" /> <span className="_ _2" />
                            Lea
                            <span className="_ _1" />
                            se/
                            <span className="_ _1" />
                            Re
                            <span className="_ _1" />
                            nt
                            <span className="_ _1" />
                            al
                            <span className="_ _1" /> <span className="_ _2" />
                            Agr
                            <span className="_ _1" />
                            eem
                            <span className="_ _1" />
                            en
                            <span className="_ _1" />t (“
                            <span className="ff2">
                                Agre
                                <span className="_ _1" />e<span className="_ _1" />
                                ment
                                <span className="_ _1" />
                                <span className="ff3">
                                    ”<span className="_ _1" />
                                    ). <span className="_ _2" /> <span className="_ _2" />
                                    Unde
                                    <span className="_ _1" />r <span className="_ _2" />
                                    th
                                    <span className="_ _1" />e <span className="_ _2" />
                                    Ag
                                    <span className="_ _1" />
                                    ree
                                    <span className="_ _1" />
                                    men
                                    <span className="_ _1" />t<span className="_ _1" />,{" "}
                                    <span className="_ _2" />
                                    Lan
                                    <span className="_ _1" />
                                    dl
                                    <span className="_ _1" />
                                    ord
                                    <span className="_ _1" /> <span className="_ _2" />
                                    re
                                    <span className="_ _1" />
                                    nte
                                    <span className="_ _1" />d <span className="_ _2" />
                                    to
                                    <span className="_ _1" /> <span className="_ _2" />
                                    Tena
                                    <span className="_ _1" />
                                    nt
                                    <span className="_ _1" />{" "}
                                </span>
                            </span>
                        </div>
                        <div className="t m0 x3 h5 y8 ff3 fs2 fc0 sc0 ls0 ws0">
                            pro
                            <span className="_ _1" />
                            pe
                            <span className="_ _1" />
                            rt
                            <span className="_ _1" />y <span className="_ _4"> </span>lo
                            <span className="_ _1" />
                            ca
                            <span className="_ _1" />
                            te
                            <span className="_ _1" />d <span className="_ _4"> </span>at{" "}
                            <span className="_ _4" />
                            42
                            <span className="_ _1" />0<span className="_ _1" />1{" "}
                            <span className="_ _4"> </span>Ja
                            <span className="_ _1" />
                            mbo
                            <span className="_ _1" />
                            re
                            <span className="_ _1" />e <span className="_ _4"> </span>Ro
                            <span className="_ _1" />
                            ad,
                            <span className="_ _1" /> <span className="_ _4"> </span>New
                            <span className="_ _1" />p<span className="_ _1" />
                            ort <span className="_ _4"> </span>Be
                            <span className="_ _1" />a<span className="_ _1" />
                            ch
                            <span className="_ _1" />, <span className="_ _4"> </span>CA
                            <span className="_ _1" /> <span className="_ _4"> </span>9266
                            <span className="_ _1" />0 <span className="_ _4"> </span>(
                            <span className="_ _1" />“
                            <span className="ff2">
                                Pre
                                <span className="_ _1" />
                                mis
                                <span className="_ _1" />e<span className="_ _1" />s
                                <span className="ff3">
                                    ”<span className="_ _1" />
                                    ). <span className="_ _4"> </span> <span className="_ _4"> </span>
                                    As
                                    <span className="_ _1" /> <span className="_ _4"> </span>a{" "}
                                    <span className="_ _4"> </span>con
                                    <span className="_ _1" />
                                    di
                                    <span className="_ _1" />
                                    ti
                                    <span className="_ _1" />
                                    on <span className="_ _5" />
                                    to <span className="_ _5"> </span>ente
                                    <span className="_ _1" />
                                    ri
                                    <span className="_ _1" />
                                    ng <span className="_ _5"> </span>int
                                    <span className="_ _1" />o <span className="_ _4"> </span>t
                                    <span className="_ _1" />
                                    he
                                    <span className="_ _1" />{" "}
                                </span>
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y9 ff3 fs2 fc0 sc0 ls0 ws0">
                            Agre
                            <span className="_ _1" />
                            em
                            <span className="_ _1" />
                            en
                            <span className="_ _1" />
                            t,
                            <span className="_ _1" /> L<span className="_ _1" />
                            an
                            <span className="_ _1" />
                            dlo
                            <span className="_ _1" />
                            rd
                            <span className="_ _1" /> h<span className="_ _1" />
                            as
                            <span className="_ _1" /> r<span className="_ _1" />
                            eq
                            <span className="_ _1" />
                            ui
                            <span className="_ _1" />
                            re
                            <span className="_ _1" />d <span className="_ _1" />
                            th
                            <span className="_ _1" />
                            at <span className="_ _1" />
                            Gu
                            <span className="_ _1" />
                            ar
                            <span className="_ _1" />
                            an
                            <span className="_ _1" />
                            to
                            <span className="_ _1" />r e<span className="_ _1" />x
                            <span className="_ _1" />
                            ecu
                            <span className="_ _1" />
                            te
                            <span className="_ _1" /> a<span className="_ _1" />
                            nd
                            <span className="_ _1" /> <span className="_ _1" />
                            del
                            <span className="_ _1" />i<span className="_ _1" />
                            ver
                            <span className="_ _1" /> t<span className="_ _1" />o L
                            <span className="_ _1" />a<span className="_ _1" />
                            ndl
                            <span className="_ _1" />
                            or
                            <span className="_ _1" />d t<span className="_ _1" />
                            hi
                            <span className="_ _1" />s <span className="_ _1" />
                            Gu
                            <span className="_ _1" />
                            ara
                            <span className="_ _1" />n<span className="_ _1" />
                            ty.
                            <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 ya ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 yb ff3 fs2 fc0 sc0 ls0 ws0">
                            As <span className="_ _1" />a <span className="_ _1" />
                            mat
                            <span className="_ _1" />e<span className="_ _1" />
                            ria
                            <span className="_ _1" />l i<span className="_ _1" />n
                            <span className="_ _1" />
                            duc
                            <span className="_ _1" />e<span className="_ _1" />
                            men
                            <span className="_ _1" />t <span className="_ _1" />
                            to
                            <span className="_ _1" /> La
                            <span className="_ _1" />
                            ndl
                            <span className="_ _1" />o<span className="_ _1" />
                            rd
                            <span className="_ _1" /> t<span className="_ _1" />o{" "}
                            <span className="_ _1" />
                            ent
                            <span className="_ _1" />e<span className="_ _1" />r i
                            <span className="_ _1" />
                            nt
                            <span className="_ _1" />o t<span className="_ _1" />
                            he
                            <span className="_ _1" /> <span className="_ _1" />
                            Leas
                            <span className="_ _6" />e w<span className="_ _6" />
                            ith <span className="_ _6" />
                            Tenant
                            <span className="_ _6" />, G<span className="_ _6" />
                            uaran
                            <span className="_ _6" />
                            tor <span className="_ _6" />
                            agre
                            <span className="_ _6" />
                            es as
                            <span className="_ _6" /> fol
                            <span className="_ _6" />
                            lows:
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 yc ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 yd ff2 fs2 fc0 sc0 ls0 ws0">
                            1. <span className="_ _6" /> Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _1" />
                            y. <span className="_ _6" />{" "}
                            <span className="ff3">
                                Gua
                                <span className="_ _1" />
                                ran
                                <span className="_ _6" />
                                tor
                                <span className="_ _1" /> <span className="_ _7"> </span>abs
                                <span className="_ _6" />
                                olut
                                <span className="_ _6" />
                                ely,
                                <span className="_ _6" /> <span className="_"> </span>un
                                <span className="_ _6" />
                                condi
                                <span className="_ _6" />
                                tio
                                <span className="_ _6" />
                                nally
                                <span className="_ _6" /> <span className="_"> </span>a
                                <span className="_ _6" />
                                nd <span className="_ _7"> </span>ir
                                <span className="_ _1" />
                                re
                                <span className="_ _6" />
                                vocabl
                                <span className="_ _6" />y <span className="_ _7"> </span>g
                                <span className="_ _1" />
                                uar
                                <span className="_ _6" />
                                ante
                                <span className="_ _6" />
                                es <span className="_ _7"> </span>to
                                <span className="_ _6" /> <span className="_"> </span>La
                                <span className="_ _6" />
                                ndlo
                                <span className="_ _6" />
                                rd <span className="_ _7"> </span>th
                                <span className="_ _6" />e <span className="_"> </span>t
                                <span className="_ _1" />i<span className="_ _1" />
                                mel
                                <span className="_ _6" />y <span className="_ _7"> </span>pay
                                <span className="_ _1" />
                                me
                                <span className="_ _6" />
                                nt <span className="_ _7"> </span>of
                                <span className="_ _1" /> <span className="_ _7"> </span>all
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 ye ff3 fs2 fc0 sc0 ls0 ws0">
                            amo
                            <span className="_ _6" />
                            unts <span className="_ _5" />
                            that
                            <span className="_ _6" /> <span className="_ _5"> </span>Tenant
                            <span className="_ _6" /> <span className="_ _4"> </span>owes
                            <span className="_ _6" /> <span className="_ _4"> </span>und
                            <span className="_ _1" />
                            er <span className="_ _5" />
                            the
                            <span className="_ _6" /> <span className="_ _4"> </span>Agre
                            <span className="_ _6" />
                            ement
                            <span className="_ _6" />, <span className="_ _4"> </span>or{" "}
                            <span className="_ _5" />
                            an
                            <span className="_ _1" />y <span className="_ _5"> </span>Leas
                            <span className="_ _1" />e <span className="_ _5" />
                            exte
                            <span className="_ _6" />
                            nsi
                            <span className="_ _1" />
                            ons
                            <span className="_ _1" />, <span className="_ _5" />
                            ren
                            <span className="_ _1" />
                            ewa
                            <span className="_ _1" />
                            ls
                            <span className="_ _6" />, <span className="_ _4"> </span>or{" "}
                            <span className="_ _5" />
                            mod
                            <span className="_ _1" />i<span className="_ _1" />
                            fica
                            <span className="_ _6" />
                            tio
                            <span className="_ _6" />
                            ns. <span className="_ _5" /> <span className="_ _4"> </span>Guar
                            <span className="_ _1" />
                            an
                            <span className="_ _6" />
                            tor <span className="_ _5" />
                            fur
                            <span className="_ _6" />
                            the
                            <span className="_ _6" />r{" "}
                        </div>
                        <div className="t m0 x3 h4 yf ff3 fs2 fc0 sc0 ls0 ws0">
                            gua
                            <span className="_ _6" />
                            rante
                            <span className="_ _6" />
                            es <span className="_ _8"> </span>Te
                            <span className="_ _6" />
                            nant
                            <span className="_ _6" />
                            ’s <span className="_ _8"> </span>ful
                            <span className="_ _6" />
                            l, <span className="_ _8"> </span>fai
                            <span className="_ _6" />
                            thf
                            <span className="_ _6" />
                            ul,
                            <span className="_ _1" /> <span className="_ _8"> </span>and
                            <span className="_ _6" /> <span className="_ _9"> </span>ti
                            <span className="_ _6" />
                            mely
                            <span className="_ _1" /> <span className="_ _8"> </span>pe
                            <span className="_ _1" />
                            rfo
                            <span className="_ _6" />
                            rman
                            <span className="_ _6" />
                            ce <span className="_ _8"> </span>of
                            <span className="_ _6" /> <span className="_ _9"> </span>th
                            <span className="_ _6" />e <span className="_ _9"> </span>A
                            <span className="_ _1" />
                            gre
                            <span className="_ _6" />
                            ement
                            <span className="_ _6" />, <span className="_ _8"> </span>or
                            <span className="_ _6" /> <span className="_ _9"> </span>an
                            <span className="_ _6" />y <span className="_ _8"> </span>Leas
                            <span className="_ _6" />e <span className="_ _8"> </span>exte
                            <span className="_ _6" />
                            nsio
                            <span className="_ _6" />
                            ns, <span className="_"> </span>rene
                            <span className="_ _1" />
                            wa
                            <span className="_ _6" />
                            ls,
                            <span className="_ _1" /> <span className="_ _8"> </span>or
                            <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y10 ff3 fs2 fc0 sc0 ls0 ws0">
                            mod
                            <span className="_ _1" />
                            ifi
                            <span className="_ _6" />
                            cati
                            <span className="_ _6" />
                            ons.
                            <span className="_ _1" /> If
                            <span className="_ _1" /> Tena
                            <span className="_ _6" />
                            nt fa
                            <span className="_ _6" />
                            ils t<span className="_ _6" />o pay <span className="_ _1" />
                            am
                            <span className="_ _6" />
                            ounts d<span className="_ _6" />
                            ue (w
                            <span className="_ _6" />
                            heth
                            <span className="_ _6" />e<span className="_ _2" />r
                            <span className="_ _6" /> rent o<span className="_ _6" />r oth
                            <span className="_ _6" />
                            er am
                            <span className="_ _6" />
                            ounts
                            <span className="_ _6" />) or fa
                            <span className="_ _1" />i<span className="_ _1" />
                            ls
                            <span className="_ _1" /> to <span className="_ _1" />
                            oth
                            <span className="_ _1" />
                            erwi
                            <span className="_ _6" />
                            se pe
                            <span className="_ _6" />
                            rfor
                            <span className="_ _6" />m any
                            <span className="_ _6" /> <span className="_ _2" />
                            co
                            <span className="_ _6" />
                            vena
                            <span className="_ _6" />
                            nt{" "}
                        </div>
                        <div className="t m0 x3 h4 y11 ff3 fs2 fc0 sc0 ls0 ws0">
                            or <span className="_ _5" />
                            obl
                            <span className="_ _1" />
                            ig
                            <span className="_ _1" />
                            ati
                            <span className="_ _6" />
                            on <span className="_ _4"> </span>un
                            <span className="_ _1" />
                            der <span className="_ _5" />
                            the
                            <span className="_ _6" /> <span className="_ _a"> </span>Ag
                            <span className="_ _6" />
                            ree
                            <span className="_ _1" />
                            ment
                            <span className="_ _6" />, <span className="_ _4"> </span>Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _1" />
                            or <span className="_ _5" />
                            (at <span className="_ _5" />
                            Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />
                            or'
                            <span className="_ _1" />s <span className="_ _5"> </span>expens
                            <span className="_ _6" />
                            e) <span className="_ _5"> </span>will <span className="_ _5" />
                            full
                            <span className="_ _6" />y <span className="_ _4"> </span>and
                            <span className="_ _6" /> <span className="_ _a"> </span>pr
                            <span className="_ _6" />
                            omptl
                            <span className="_ _6" />y <span className="_ _4"> </span>pay
                            <span className="_ _6" /> <span className="_ _a"> </span>all
                            <span className="_ _6" /> <span className="_ _4"> </span>amou
                            <span className="_ _1" />
                            nts
                            <span className="_ _6" /> <span className="_ _4"> </span>due{" "}
                            <span className="_ _4"> </span>an
                            <span className="_ _6" />d{" "}
                        </div>
                        <div className="t m0 x3 h4 y12 ff3 fs2 fc0 sc0 ls0 ws0">
                            per
                            <span className="_ _6" />
                            form
                            <span className="_ _6" /> <span className="_ _3" />
                            all
                            <span className="_ _6" /> <span className="_ _2" />
                            of Tena
                            <span className="_ _1" />
                            nt’
                            <span className="_ _6" />s <span className="_ _2" />
                            cov
                            <span className="_ _6" />
                            enant
                            <span className="_ _6" />s <span className="_ _2" />
                            and
                            <span className="_ _6" /> <span className="_ _2" />
                            obli
                            <span className="_ _6" />
                            gati
                            <span className="_ _1" />
                            ons
                            <span className="_ _6" /> <span className="_ _2" />
                            unde
                            <span className="_ _6" />r <span className="_ _2" />
                            the Lea
                            <span className="_ _6" />
                            se on <span className="_ _2" />
                            de
                            <span className="_ _1" />
                            man
                            <span className="_ _6" />d <span className="_ _2" />
                            by Lan
                            <span className="_ _1" />
                            dlo
                            <span className="_ _6" />
                            rd. <span className="_ _2" />
                            Amou
                            <span className="_ _6" />
                            nts
                            <span className="_ _1" /> <span className="_ _2" />
                            due
                            <span className="_ _6" /> <span className="_ _2" />
                            may inclu
                            <span className="_ _6" />
                            de (but
                            <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y13 ff3 fs2 fc0 sc0 ls0 ws0">
                            are
                            <span className="_ _1" /> not
                            <span className="_ _1" /> limi
                            <span className="_ _6" />
                            ted to)
                            <span className="_ _6" /> <span className="_ _2" />
                            re
                            <span className="_ _6" />
                            nt, int
                            <span className="_ _6" />
                            eres
                            <span className="_ _6" />
                            t, cost
                            <span className="_ _6" />s adva
                            <span className="_ _6" />
                            nced
                            <span className="_ _6" /> <span className="_ _2" />
                            by Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />
                            d, dam
                            <span className="_ _6" />
                            ages
                            <span className="_ _6" />, <span className="_ _2" /> cle
                            <span className="_ _1" />
                            ani
                            <span className="_ _6" />
                            ng cost
                            <span className="_ _6" />
                            s, rep
                            <span className="_ _1" />
                            ai
                            <span className="_ _6" />r <span className="_ _2" />
                            cos
                            <span className="_ _6" />
                            ts, or
                            <span className="_ _1" /> repl
                            <span className="_ _6" />
                            acem
                            <span className="_ _6" />
                            ent cos
                            <span className="_ _6" />
                            ts fo
                            <span className="_ _6" />r{" "}
                        </div>
                        <div className="t m0 x3 h4 y14 ff3 fs2 fc0 sc0 ls0 ws0">
                            rea
                            <span className="_ _1" />l<span className="_ _1" />{" "}
                            <span className="_ _3" />
                            or <span className="_ _2" />
                            perso
                            <span className="_ _6" />
                            nal <span className="_ _2" />
                            prop
                            <span className="_ _6" />
                            erty,
                            <span className="_ _6" /> <span className="_ _3" />
                            and <span className="_ _2" />
                            all <span className="_ _2" />
                            expe
                            <span className="_ _6" />
                            nses
                            <span className="_ _6" /> <span className="_ _5" />
                            in
                            <span className="_ _1" />
                            clu
                            <span className="_ _6" />
                            ding,
                            <span className="_ _6" /> <span className="_ _3" />
                            (bu
                            <span className="_ _1" />t <span className="_ _2" />
                            not <span className="_ _3" />
                            lim
                            <span className="_ _6" />
                            ited
                            <span className="_ _1" /> <span className="_ _3" />
                            to) <span className="_ _2" />
                            co
                            <span className="_ _1" />
                            urt
                            <span className="_ _6" /> <span className="_ _5" />
                            co
                            <span className="_ _6" />
                            sts <span className="_ _2" />
                            and <span className="_ _3" />
                            re
                            <span className="_ _6" />
                            asona
                            <span className="_ _6" />
                            ble
                            <span className="_ _6" /> <span className="_ _5" />
                            att
                            <span className="_ _6" />
                            orne
                            <span className="_ _6" />y <span className="_ _3" />
                            fees
                            <span className="_ _6" /> <span className="_ _5" />t
                            <span className="_ _1" />
                            hat
                            <span className="_ _6" /> <span className="_ _3" />
                            may{" "}
                        </div>
                        <div className="t m0 x3 h4 y15 ff3 fs2 fc0 sc0 ls0 ws0">
                            ari
                            <span className="_ _6" />
                            se <span className="_ _4"> </span>bec
                            <span className="_ _1" />
                            aus
                            <span className="_ _1" />e <span className="_ _5"> </span>of{" "}
                            <span className="_ _4"> </span>Tena
                            <span className="_ _1" />
                            nt
                            <span className="_ _1" />
                            ’s <span className="_ _5" />
                            defa
                            <span className="_ _6" />
                            ult.
                            <span className="_ _6" /> <span className="_ _a"> </span>{" "}
                            <span className="_ _4"> </span>In <span className="_ _4"> </span>addi
                            <span className="_ _6" />
                            tion
                            <span className="_ _6" />, <span className="_ _a"> </span>G
                            <span className="_ _1" />
                            uar
                            <span className="_ _6" />
                            anto
                            <span className="_ _6" />r <span className="_ _a"> </span>ag
                            <span className="_ _6" />
                            rees <span className="_ _5"> </span>to <span className="_ _4"> </span>
                            pay <span className="_ _5"> </span>reas
                            <span className="_ _6" />
                            onabl
                            <span className="_ _6" />e <span className="_ _4"> </span>att
                            <span className="_ _1" />
                            orn
                            <span className="_ _6" />
                            ey <span className="_ _4"> </span>fees
                            <span className="_ _6" /> <span className="_ _a"> </span>and
                            <span className="_ _6" /> <span className="_ _a"> </span>all
                            <span className="_ _6" /> <span className="_ _a"> </span>oth
                            <span className="_ _6" />
                            er <span className="_ _4"> </span>costs
                            <span className="_ _6" /> <span className="_ _4"> </span>and{" "}
                        </div>
                        <div className="t m0 x3 h4 y16 ff3 fs2 fc0 sc0 ls0 ws0">
                            exp
                            <span className="_ _6" />
                            enses
                            <span className="_ _6" /> <span className="_ _5" />
                            in
                            <span className="_ _6" />
                            curre
                            <span className="_ _6" />d <span className="_ _5" />b
                            <span className="_ _6" />y <span className="_ _5" />
                            La
                            <span className="_ _6" />
                            ndlo
                            <span className="_ _6" />
                            rd <span className="_ _5" />i<span className="_ _6" />n{" "}
                            <span className="_ _5" />
                            en
                            <span className="_ _6" />
                            forci
                            <span className="_ _6" />
                            ng <span className="_ _3" />
                            this
                            <span className="_ _6" /> <span className="_ _5" />
                            Gu
                            <span className="_ _6" />
                            arant
                            <span className="_ _6" />y <span className="_ _3" />
                            or <span className="_ _3" />
                            in <span className="_ _3" />
                            an
                            <span className="_ _1" />y <span className="_ _3" />
                            acti
                            <span className="_ _6" />
                            on <span className="_ _3" />
                            or <span className="_ _3" />
                            pro
                            <span className="_ _6" />
                            ceedi
                            <span className="_ _6" />
                            ng <span className="_ _3" />
                            ari
                            <span className="_ _6" />
                            sing <span className="_ _3" />
                            out
                            <span className="_ _6" /> <span className="_ _5" />
                            of,
                            <span className="_ _6" /> <span className="_ _5" />o
                            <span className="_ _1" />r <span className="_ _3" />
                            rel
                            <span className="_ _6" />
                            ating
                            <span className="_ _6" /> <span className="_ _5" />
                            to
                            <span className="_ _1" />, <span className="_ _3" />
                            thi
                            <span className="_ _6" />s{" "}
                        </div>
                        <div className="t m0 x3 h4 y17 ff3 fs2 fc0 sc0 ls0 ws0">
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />
                            y. <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y18 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y19 ff2 fs2 fc0 sc0 ls0 ws0">
                            2.
                            <span className="_ _6" /> <span className="_ _b"> </span>{" "}
                            <span className="_ _a"> </span>Term.
                            <span className="_ _6" /> <span className="_ _a"> </span>{" "}
                            <span className="_ _a"> </span>
                            <span className="ff3">
                                This <span className="_ _4"> </span>Guar
                                <span className="_ _6" />
                                anty
                                <span className="_ _6" /> <span className="_ _b"> </span>wi
                                <span className="_ _1" />
                                ll
                                <span className="_ _1" /> <span className="_ _a"> </span>bec
                                <span className="_ _6" />
                                ome <span className="_ _a"> </span>eff
                                <span className="_ _6" />
                                ecti
                                <span className="_ _6" />
                                ve <span className="_ _a"> </span>whe
                                <span className="_ _6" />n <span className="_ _a"> </span>it{" "}
                                <span className="_ _a"> </span>is
                                <span className="_ _6" /> <span className="_ _b"> </span>sig
                                <span className="_ _6" />
                                ned <span className="_ _4"> </span>and
                                <span className="_ _1" /> <span className="_ _a"> </span>del
                                <span className="_ _1" />
                                iv
                                <span className="_ _1" />
                                ere
                                <span className="_ _6" />d <span className="_ _a"> </span>to{" "}
                                <span className="_ _a"> </span>L<span className="_ _1" />
                                and
                                <span className="_ _1" />
                                lo
                                <span className="_ _1" />
                                rd
                                <span className="_ _6" />, <span className="_ _a"> </span>and{" "}
                                <span className="_ _4"> </span>notw
                                <span className="_ _1" />
                                it
                                <span className="_ _6" />
                                hsta
                                <span className="_ _1" />
                                ndi
                                <span className="_ _6" />
                                ng <span className="_ _a"> </span>an
                                <span className="_ _1" />y{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y1a ff3 fs2 fc0 sc0 ls0 ws0">
                            term
                            <span className="_ _6" />
                            inat
                            <span className="_ _1" />i<span className="_ _1" />
                            on,
                            <span className="_ _6" /> <span className="_ _2" />
                            ren
                            <span className="_ _6" />
                            ewal,
                            <span className="_ _6" /> extens
                            <span className="_ _6" />
                            ion
                            <span className="_ _6" /> <span className="_ _2" />
                            or hol
                            <span className="_ _6" />
                            din
                            <span className="_ _1" />g ove
                            <span className="_ _6" />r <span className="_ _2" />
                            of t<span className="_ _6" />
                            he Agree
                            <span className="_ _6" />
                            ment
                            <span className="_ _6" />, <span className="_ _2" />
                            it
                            <span className="_ _6" /> will co
                            <span className="_ _6" />
                            ntin
                            <span className="_ _6" />
                            ue until
                            <span className="_ _6" /> <span className="_ _2" />
                            al
                            <span className="_ _1" />l of T<span className="_ _1" />
                            ena
                            <span className="_ _6" />
                            nt’s
                            <span className="_ _6" /> <span className="_ _2" />
                            obl
                            <span className="_ _6" />
                            igat
                            <span className="_ _6" />
                            ions ha
                            <span className="_ _6" />
                            ve bee
                            <span className="_ _6" />n{" "}
                        </div>
                        <div className="t m0 x3 h4 y1b ff3 fs2 fc0 sc0 ls0 ws0">
                            ful
                            <span className="_ _1" />
                            ly
                            <span className="_ _1" /> <span className="_ _a"> </span>and
                            <span className="_ _6" /> <span className="_ _b"> </span>com
                            <span className="_ _6" />
                            plete
                            <span className="_ _6" />
                            ly <span className="_ _a"> </span>per
                            <span className="_ _6" />
                            form
                            <span className="_ _6" />
                            ed. <span className="_ _a"> </span>Gu
                            <span className="_ _6" />
                            arant
                            <span className="_ _6" />
                            or <span className="_ _a"> </span>wai
                            <span className="_ _1" />
                            ves
                            <span className="_ _6" /> <span className="_ _b"> </span>the
                            <span className="_ _6" /> <span className="_ _a"> </span>provi
                            <span className="_ _6" />
                            sio
                            <span className="_ _6" />
                            ns <span className="_ _a"> </span>of <span className="_ _a"> </span>
                            Cali
                            <span className="_ _6" />
                            for
                            <span className="_ _6" />
                            nia <span className="_ _a"> </span>Ci
                            <span className="_ _6" />
                            vil <span className="_ _a"> </span>Co
                            <span className="_ _6" />
                            de <span className="_ _a"> </span>§28
                            <span className="_ _6" />
                            15, <span className="_ _a"> </span>and
                            <span className="_ _6" /> <span className="_ _b"> </span>und
                            <span className="_ _1" />
                            ers
                            <span className="_ _6" />
                            tands
                            <span className="_ _6" /> <span className="_ _a"> </span>that
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y1c ff3 fs2 fc0 sc0 ls0 ws0">
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />
                            or <span className="_ _7"> </span>ma
                            <span className="_ _6" />y <span className="_ _b"> </span>not{" "}
                            <span className="_ _b"> </span>rev
                            <span className="_ _6" />
                            oke <span className="_ _b"> </span>thi
                            <span className="_ _6" />s <span className="_ _7"> </span>co
                            <span className="_ _6" />
                            ntinu
                            <span className="_ _6" />
                            ing <span className="_ _b"> </span>gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />y <span className="_ _7"> </span>un
                            <span className="_ _6" />
                            til <span className="_ _b"> </span>al
                            <span className="_ _6" />l <span className="_"> </span>o
                            <span className="_ _6" />f <span className="_ _7"> </span>R
                            <span className="_ _1" />
                            esi
                            <span className="_ _6" />
                            dent
                            <span className="_ _6" />
                            ’s <span className="_ _b"> </span>obli
                            <span className="_ _6" />
                            gati
                            <span className="_ _6" />
                            ons <span className="_ _b"> </span>hav
                            <span className="_ _6" />e <span className="_ _7"> </span>bee
                            <span className="_ _6" />n <span className="_ _b"> </span>full
                            <span className="_ _6" />y <span className="_ _7"> </span>an
                            <span className="_ _6" />d <span className="_ _7"> </span>co
                            <span className="_ _1" />
                            mpl
                            <span className="_ _6" />
                            etel
                            <span className="_ _6" />y{" "}
                        </div>
                        <div className="t m0 x3 h4 y1d ff3 fs2 fc0 sc0 ls0 ws0">
                            per
                            <span className="_ _6" />
                            form
                            <span className="_ _6" />
                            ed, a<span className="_ _6" />
                            nd p<span className="_ _6" />
                            osses
                            <span className="_ _6" />
                            sion
                            <span className="_ _6" /> of <span className="_ _6" />
                            the <span className="_ _6" />
                            prop
                            <span className="_ _1" />
                            ert
                            <span className="_ _6" />y ha
                            <span className="_ _6" />s be
                            <span className="_ _1" />
                            en <span className="_ _6" />
                            rest
                            <span className="_ _6" />
                            ore
                            <span className="_ _6" />d to <span className="_ _6" />
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _1" />
                            d.
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h5 y1e ff2 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y1f ff2 fs2 fc0 sc0 ls0 ws0">
                            3. T<span className="_ _6" />
                            enan
                            <span className="_ _6" />t De
                            <span className="_ _6" />
                            fini
                            <span className="_ _6" />
                            tion.
                            <span className="_ _1" /> <span className="_ _6" />
                            <span className="ff3">
                                For <span className="_ _5"> </span>purpo
                                <span className="_ _6" />
                                ses <span className="_ _4"> </span>of{" "}
                                <span className="_ _4"> </span>this
                                <span className="_ _6" /> <span className="_ _a"> </span>Gu
                                <span className="_ _6" />
                                aran
                                <span className="_ _1" />
                                ty
                                <span className="_ _1" />, <span className="_ _4"> </span>and{" "}
                                <span className="_ _4"> </span>the
                                <span className="_ _6" /> <span className="_ _a"> </span>obl
                                <span className="_ _1" />
                                ig
                                <span className="_ _1" />
                                ati
                                <span className="_ _6" />
                                ons <span className="_ _4"> </span>and
                                <span className="_ _6" /> <span className="_ _a"> </span>lia
                                <span className="_ _6" />
                                bili
                                <span className="_ _6" />
                                ties
                                <span className="_ _1" /> <span className="_ _4"> </span>of{" "}
                                <span className="_ _4"> </span>Guar
                                <span className="_ _6" />
                                anto
                                <span className="_ _6" />
                                r, <span className="_ _a"> </span>th
                                <span className="_ _6" />e <span className="_ _a"> </span>ter
                                <span className="_ _6" />m <span className="_ _a"> </span>“
                                <span className="_ _6" />
                                Tenant
                                <span className="_ _6" />”{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y20 ff3 fs2 fc0 sc0 ls0 ws0">
                            incl
                            <span className="_ _6" />
                            udes
                            <span className="_ _1" /> <span className="_ _a"> </span>any{" "}
                            <span className="_ _a"> </span>and <span className="_ _4"> </span>all{" "}
                            <span className="_ _a"> </span>occ
                            <span className="_ _6" />
                            upant
                            <span className="_ _6" />s <span className="_ _a"> </span>of{" "}
                            <span className="_ _b"> </span>the
                            <span className="_ _1" /> <span className="_ _a"> </span>Premi
                            <span className="_ _6" />
                            ses,
                            <span className="_ _6" /> <span className="_ _b"> </span>whet
                            <span className="_ _1" />
                            he
                            <span className="_ _6" />r <span className="_ _b"> </span>ori
                            <span className="_ _6" />
                            ginal <span className="_ _a"> </span>Res
                            <span className="_ _6" />
                            iden
                            <span className="_ _6" />
                            ts, <span className="_ _a"> </span>sub
                            <span className="_ _6" />
                            tena
                            <span className="_ _1" />
                            nts
                            <span className="_ _6" />, <span className="_ _b"> </span>as
                            <span className="_ _6" />
                            signee
                            <span className="_ _6" />
                            s, <span className="_ _a"> </span>or <span className="_ _a"> </span>
                            oth
                            <span className="_ _1" />
                            er
                            <span className="_ _1" />s <span className="_ _a"> </span>dire
                            <span className="_ _6" />
                            ctly
                            <span className="_ _1" /> <span className="_ _a"> </span>or{" "}
                        </div>
                        <div className="t m0 x3 h4 y21 ff3 fs2 fc0 sc0 ls0 ws0">
                            indi
                            <span className="_ _6" />
                            rect
                            <span className="_ _6" />
                            ly l<span className="_ _6" />
                            easi
                            <span className="_ _6" />
                            ng o<span className="_ _6" />r occ
                            <span className="_ _6" />
                            upyi
                            <span className="_ _6" />
                            ng t<span className="_ _6" />
                            he P<span className="_ _6" />
                            remi
                            <span className="_ _1" />
                            ses
                            <span className="_ _6" />.{" "}
                        </div>
                        <div className="t m0 x3 h4 y22 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y23 ff2 fs2 fc0 sc0 ls0 ws0">
                            4. <span className="_ _6" /> Ind
                            <span className="_ _1" />
                            ep
                            <span className="_ _6" />e<span className="_ _2" />
                            nd
                            <span className="_ _6" />
                            ent <span className="_ _6" />
                            Obli
                            <span className="_ _6" />
                            gati
                            <span className="_ _6" />
                            ons. <span className="_ _6" />{" "}
                            <span className="ff3">
                                The
                                <span className="_ _6" /> <span className="_ _3" />
                                obl
                                <span className="_ _6" />
                                igati
                                <span className="_ _6" />
                                ons of <span className="_ _2" />
                                Guara
                                <span className="_ _6" />
                                nt
                                <span className="_ _6" />
                                or <span className="_ _2" />
                                are <span className="_ _2" />
                                in
                                <span className="_ _6" />
                                depe
                                <span className="_ _1" />
                                nde
                                <span className="_ _6" />
                                nt <span className="_ _2" />
                                of,
                                <span className="_ _6" /> <span className="_ _3" />
                                and
                                <span className="_ _6" /> <span className="_ _3" />
                                may
                                <span className="_ _1" /> <span className="_ _2" />
                                exc
                                <span className="_ _1" />
                                eed
                                <span className="_ _6" />, <span className="_ _3" />
                                the
                                <span className="_ _6" /> <span className="_ _2" />
                                oblig
                                <span className="_ _6" />
                                atio
                                <span className="_ _6" />
                                ns <span className="_ _2" />
                                of <span className="_ _2" />
                                Te
                                <span className="_ _6" />
                                nant
                                <span className="_ _1" />.{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y24 ff3 fs2 fc0 sc0 ls0 ws0">
                            At <span className="_ _6" />
                            Landl
                            <span className="_ _6" />
                            ord’s
                            <span className="_ _6" /> opti
                            <span className="_ _6" />
                            on,
                            <span className="_ _1" /> a <span className="_ _6" />
                            separ
                            <span className="_ _6" />
                            ate
                            <span className="_ _6" /> actio
                            <span className="_ _6" />n ma
                            <span className="_ _1" />y b<span className="_ _6" />e br
                            <span className="_ _6" />
                            ought
                            <span className="_ _1" /> an
                            <span className="_ _6" />d pr
                            <span className="_ _6" />
                            osecu
                            <span className="_ _6" />
                            ted <span className="_ _6" />
                            agai
                            <span className="_ _6" />
                            nst G<span className="_ _6" />
                            uarant
                            <span className="_ _6" />
                            or,
                            <span className="_ _6" /> whet
                            <span className="_ _1" />
                            he
                            <span className="_ _6" />r or <span className="_ _6" />
                            not a<span className="_ _6" />
                            ny act
                            <span className="_ _6" />
                            ion <span className="_ _6" />
                            is fi
                            <span className="_ _6" />
                            rst <span className="_ _1" />
                            or
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y25 ff3 fs2 fc0 sc0 ls0 ws0">
                            sub
                            <span className="_ _6" />
                            seque
                            <span className="_ _6" />
                            ntl
                            <span className="_ _6" />y <span className="_ _3" />
                            bro
                            <span className="_ _1" />
                            ugh
                            <span className="_ _6" />t <span className="_ _3" />
                            ag
                            <span className="_ _1" />
                            ai
                            <span className="_ _1" />
                            nst
                            <span className="_ _6" /> <span className="_ _3" />
                            Tena
                            <span className="_ _6" />
                            nt, <span className="_ _2" />
                            or <span className="_ _2" />
                            wh
                            <span className="_ _6" />
                            ether
                            <span className="_ _1" /> <span className="_ _2" />
                            or not <span className="_ _2" />
                            Tena
                            <span className="_ _6" />
                            nt <span className="_ _2" />
                            is
                            <span className="_ _1" /> <span className="_ _2" />
                            joine
                            <span className="_ _6" />d <span className="_ _3" />
                            in
                            <span className="_ _1" /> <span className="_ _2" />
                            any <span className="_ _2" />
                            ac
                            <span className="_ _6" />
                            tion,
                            <span className="_ _6" /> <span className="_ _3" />
                            and <span className="_ _2" />G<span className="_ _1" />
                            uar
                            <span className="_ _6" />
                            anto
                            <span className="_ _1" />r <span className="_ _2" />
                            ma
                            <span className="_ _1" />y <span className="_ _2" />
                            be <span className="_ _2" />
                            joi
                            <span className="_ _6" />
                            ned <span className="_ _2" />
                            in <span className="_ _2" />
                            any
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y26 ff3 fs2 fc0 sc0 ls0 ws0">
                            act
                            <span className="_ _6" />
                            ion <span className="_ _6" />
                            or p<span className="_ _6" />
                            rocee
                            <span className="_ _6" />
                            ding <span className="_ _6" />
                            initi
                            <span className="_ _6" />
                            ate
                            <span className="_ _6" />d by
                            <span className="_ _6" /> Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />d agai
                            <span className="_ _6" />
                            nst
                            <span className="_ _1" /> T<span className="_ _6" />e
                            <span className="_ _2" />
                            na
                            <span className="_ _6" />
                            nt a<span className="_ _6" />
                            risi
                            <span className="_ _6" />
                            ng o<span className="_ _6" />
                            ut of
                            <span className="_ _6" />, in
                            <span className="_ _6" /> con
                            <span className="_ _6" />
                            necti
                            <span className="_ _6" />
                            on w<span className="_ _6" />
                            ith, <span className="_ _6" />
                            or <span className="_ _6" />
                            based
                            <span className="_ _6" /> up
                            <span className="_ _1" />
                            on <span className="_ _6" />
                            the <span className="_ _1" />
                            Agr
                            <span className="_ _6" />
                            eeme
                            <span className="_ _6" />
                            nt. <span className="_ _1" />
                        </div>
                        <div className="t m0 x3 h4 y27 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y28 ff2 fs2 fc0 sc0 ls0 ws0">
                            5.
                            <span className="_ _6" /> <span className="_ _2" /> Gua
                            <span className="_ _1" />
                            ran
                            <span className="_ _6" />
                            tor Wa
                            <span className="_ _1" />i<span className="_ _1" />
                            vers
                            <span className="_ _6" />.{" "}
                            <span className="ff3">
                                Guar
                                <span className="_ _6" />
                                antor
                                <span className="_ _6" /> <span className="_ _2" />
                                wa
                                <span className="_ _1" />
                                iv
                                <span className="_ _1" />
                                es
                                <span className="_ _6" /> <span className="_ _2" />a
                                <span className="_ _1" />
                                nd rel
                                <span className="_ _6" />
                                inq
                                <span className="_ _6" />
                                uishe
                                <span className="_ _1" />s<span className="_ _1" /> any a
                                <span className="_ _1" />
                                nd
                                <span className="_ _6" /> <span className="_ _2" />
                                all
                                <span className="_ _6" /> <span className="_ _2" />
                                ri
                                <span className="_ _6" />
                                ghts
                                <span className="_ _6" /> <span className="_ _2" />
                                or
                                <span className="_ _6" /> <span className="_ _2" />
                                re
                                <span className="_ _1" />
                                me
                                <span className="_ _6" />
                                dies
                                <span className="_ _1" /> whi
                                <span className="_ _1" />
                                ch G<span className="_ _6" />
                                uara
                                <span className="_ _6" />
                                ntor
                                <span className="_ _6" /> <span className="_ _2" />
                                may
                                <span className="_ _6" /> <span className="_ _2" />
                                ha
                                <span className="_ _1" />
                                ve
                                <span className="_ _6" /> <span className="_ _2" />
                                un
                                <span className="_ _1" />
                                de
                                <span className="_ _6" />r{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y29 ff3 fs2 fc0 sc0 ls0 ws0">
                            Cal
                            <span className="_ _6" />
                            ifor
                            <span className="_ _1" />
                            ni
                            <span className="_ _1" />a <span className="_ _6" />
                            or F<span className="_ _1" />
                            ede
                            <span className="_ _6" />
                            ral <span className="_ _1" />
                            law
                            <span className="_ _6" />, i<span className="_ _1" />
                            ncl
                            <span className="_ _6" />
                            udin
                            <span className="_ _6" />g (b
                            <span className="_ _6" />
                            ut n<span className="_ _6" />
                            ot li
                            <span className="_ _6" />
                            mite
                            <span className="_ _6" />d to)
                            <span className="_ _6" /> any
                            <span className="_ _6" /> rig
                            <span className="_ _6" />
                            ht <span className="_ _1" /> <span className="_ _c"> </span>(a)
                            <span className="_ _1" /> <span className="_ _5"> </span>to{" "}
                            <span className="_ _5"> </span>requ
                            <span className="_ _6" />
                            ire <span className="_ _5" />
                            Lan
                            <span className="_ _6" />
                            dlord
                            <span className="_ _6" /> <span className="_ _4"> </span>to{" "}
                            <span className="_ _5"> </span>pro
                            <span className="_ _1" />
                            ceed
                            <span className="_ _6" /> <span className="_ _4"> </span>aga
                            <span className="_ _6" />
                            inst <span className="_ _5" />
                            Ten
                            <span className="_ _6" />
                            ant,
                            <span className="_ _6" /> <span className="_ _4"> </span>other
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y2a ff3 fs2 fc0 sc0 ls0 ws0">
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />
                            ors, <span className="_ _2" />
                            or <span className="_ _3" />
                            any <span className="_ _2" />
                            other
                            <span className="_ _6" /> <span className="_ _5" />
                            pe
                            <span className="_ _1" />
                            rso
                            <span className="_ _6" />n <span className="_ _3" />
                            or <span className="_ _5" />e<span className="_ _6" />
                            ntit
                            <span className="_ _6" />y <span className="_ _5" />
                            li
                            <span className="_ _6" />
                            able
                            <span className="_ _6" /> <span className="_ _5" />
                            to <span className="_ _2" />
                            Landl
                            <span className="_ _6" />
                            ord
                            <span className="_ _1" /> <span className="_ _3" />
                            or <span className="_ _3" />
                            purs
                            <span className="_ _6" />
                            ue <span className="_ _3" />
                            any <span className="_ _3" />
                            ot
                            <span className="_ _6" />
                            her <span className="_ _3" />
                            rem
                            <span className="_ _6" />
                            edy <span className="_ _3" />
                            in <span className="_ _3" />
                            Lan
                            <span className="_ _6" />
                            dlord
                            <span className="_ _6" />
                            ’s <span className="_ _3" />
                            pow
                            <span className="_ _6" />
                            er, <span className="_ _3" />
                            or <span className="_ _3" />
                            an
                            <span className="_ _1" />y <span className="_ _3" />
                            rig
                            <span className="_ _6" />
                            ht{" "}
                        </div>
                        <div className="t m0 x3 h4 y2b ff3 fs2 fc0 sc0 ls0 ws0">
                            und
                            <span className="_ _6" />
                            er <span className="_ _3" />
                            Cal
                            <span className="_ _6" />
                            ifor
                            <span className="_ _6" />
                            nia <span className="_ _2" />
                            Civi
                            <span className="_ _6" />l <span className="_ _3" />
                            Code
                            <span className="_ _6" /> <span className="_ _3" />
                            §284
                            <span className="_ _6" />
                            5, <span className="_ _3" />
                            (b)
                            <span className="_ _6" /> <span className="_ _3" />
                            to <span className="_ _2" />
                            comp
                            <span className="_ _1" />
                            la
                            <span className="_ _6" />
                            in <span className="_ _2" />
                            of <span className="_ _3" />
                            del
                            <span className="_ _6" />
                            ay <span className="_ _2" />
                            in <span className="_ _3" />
                            the
                            <span className="_ _6" /> <span className="_ _5" />e
                            <span className="_ _6" />
                            nfor
                            <span className="_ _1" />
                            cem
                            <span className="_ _6" />
                            ent <span className="_ _2" />
                            of <span className="_ _2" />
                            Landl
                            <span className="_ _6" />
                            or
                            <span className="_ _6" />
                            d’s <span className="_ _2" />
                            right
                            <span className="_ _6" />s <span className="_ _3" />
                            un
                            <span className="_ _6" />
                            der <span className="_ _2" />
                            the <span className="_ _2" />
                            Agr
                            <span className="_ _6" />
                            eemen
                            <span className="_ _1" />
                            t,
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y2c ff3 fs2 fc0 sc0 ls0 ws0">
                            and
                            <span className="_ _6" /> <span className="_ _2" />
                            (c) to req
                            <span className="_ _6" />
                            uire
                            <span className="_ _1" /> <span className="_ _2" />L
                            <span className="_ _1" />
                            an
                            <span className="_ _6" />
                            dlor
                            <span className="_ _1" />d to proc
                            <span className="_ _6" />
                            eed agai
                            <span className="_ _6" />
                            nst or exh
                            <span className="_ _6" />
                            aust
                            <span className="_ _1" /> any secu
                            <span className="_ _6" />
                            rity
                            <span className="_ _6" /> <span className="_ _2" />
                            hel
                            <span className="_ _1" />d from
                            <span className="_ _6" /> <span className="_ _2" />
                            Tena
                            <span className="_ _6" />
                            nt or Guar
                            <span className="_ _1" />
                            ant
                            <span className="_ _6" />
                            or. Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />
                            or waive
                            <span className="_ _6" />s <span className="_ _2" />
                            any
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y2d ff3 fs2 fc0 sc0 ls0 ws0">
                            def
                            <span className="_ _6" />
                            ense
                            <span className="_ _6" /> <span className="_ _2" />
                            base
                            <span className="_ _6" />d <span className="_ _2" />
                            (i
                            <span className="_ _6" />) <span className="_ _2" />o
                            <span className="_ _1" />n <span className="_ _2" />a
                            <span className="_ _1" />
                            ny di
                            <span className="_ _1" />
                            sa
                            <span className="_ _6" />
                            bili
                            <span className="_ _6" />
                            ty or othe
                            <span className="_ _6" />r <span className="_ _2" />
                            de
                            <span className="_ _6" />
                            fens
                            <span className="_ _6" />e <span className="_ _2" />
                            of Ten
                            <span className="_ _6" />
                            ant,
                            <span className="_ _6" /> <span className="_ _2" />
                            (ii
                            <span className="_ _6" />) disc
                            <span className="_ _1" />
                            har
                            <span className="_ _6" />
                            ge, rel
                            <span className="_ _6" />
                            ease
                            <span className="_ _6" /> <span className="_ _2" />
                            or lim
                            <span className="_ _6" />
                            itat
                            <span className="_ _6" />
                            ion of the
                            <span className="_ _6" /> <span className="_ _2" />
                            lia
                            <span className="_ _6" />
                            bilit
                            <span className="_ _6" />y <span className="_ _2" />
                            of Ten
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" /> <span className="_ _2" />
                            to{" "}
                        </div>
                        <div className="t m0 x3 h4 y2e ff3 fs2 fc0 sc0 ls0 ws0">
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />
                            d, (iii
                            <span className="_ _6" />) <span className="_ _2" />
                            an
                            <span className="_ _1" />y res
                            <span className="_ _6" />
                            trai
                            <span className="_ _6" />
                            nt or stay
                            <span className="_ _6" /> <span className="_ _2" />
                            appl
                            <span className="_ _6" />
                            icab
                            <span className="_ _6" />
                            le to act
                            <span className="_ _6" />
                            ions
                            <span className="_ _1" /> agai
                            <span className="_ _6" />
                            nst Tena
                            <span className="_ _6" />
                            nt,
                            <span className="_ _6" /> <span className="_ _2" />
                            (iv
                            <span className="_ _6" />) <span className="_ _2" /> any
                            <span className="_ _1" /> disa
                            <span className="_ _6" />
                            ffirm
                            <span className="_ _6" />
                            ance
                            <span className="_ _1" /> or aba
                            <span className="_ _6" />
                            ndonme
                            <span className="_ _6" />
                            nt of the
                            <span className="_ _6" /> <span className="_ _2" />
                            Leas
                            <span className="_ _6" />e{" "}
                        </div>
                        <div className="t m0 x3 h4 y2f ff3 fs2 fc0 sc0 ls0 ws0">
                            by a <span className="_ _6" />
                            trust
                            <span className="_ _6" />
                            ee of
                            <span className="_ _6" /> Tena
                            <span className="_ _6" />
                            nt, wh
                            <span className="_ _6" />
                            ethe
                            <span className="_ _6" />r con
                            <span className="_ _6" />
                            sens
                            <span className="_ _6" />
                            ual, <span className="_ _6" />
                            by cou
                            <span className="_ _6" />
                            rt or
                            <span className="_ _6" />
                            der o<span className="_ _6" />r oth
                            <span className="_ _6" />
                            er go
                            <span className="_ _6" />
                            vernm
                            <span className="_ _6" />
                            enta
                            <span className="_ _6" />l aut
                            <span className="_ _6" />
                            horit
                            <span className="_ _6" />
                            y, a<span className="_ _1" />
                            ri
                            <span className="_ _1" />
                            si
                            <span className="_ _1" />
                            ng b<span className="_ _6" />y ope
                            <span className="_ _1" />
                            rat
                            <span className="_ _6" />
                            ion <span className="_ _6" />
                            of law
                            <span className="_ _6" />, or (<span className="_ _6" />
                            v){" "}
                        </div>
                        <div className="t m0 x3 h4 y30 ff3 fs2 fc0 sc0 ls0 ws0">
                            any
                            <span className="_ _6" /> <span className="_ _2" />
                            liq
                            <span className="_ _1" />
                            ui
                            <span className="_ _1" />
                            dat
                            <span className="_ _6" />
                            ion, re
                            <span className="_ _6" />
                            organ
                            <span className="_ _6" />
                            izat
                            <span className="_ _1" />i<span className="_ _1" />
                            on,
                            <span className="_ _6" /> <span className="_ _2" />
                            rec
                            <span className="_ _1" />
                            eiv
                            <span className="_ _6" />
                            ersh
                            <span className="_ _6" />
                            ip, ban
                            <span className="_ _6" />
                            krup
                            <span className="_ _1" />
                            tc
                            <span className="_ _6" />
                            y, <span className="_ _2" />
                            in
                            <span className="_ _6" />
                            sol
                            <span className="_ _6" />
                            vency
                            <span className="_ _6" /> <span className="_ _2" />
                            or de
                            <span className="_ _1" />
                            bto
                            <span className="_ _1" />r reli
                            <span className="_ _1" />
                            ef
                            <span className="_ _6" /> <span className="_ _2" />
                            pro
                            <span className="_ _6" />
                            ceedi
                            <span className="_ _6" />
                            ng, or (vi
                            <span className="_ _6" />) <span className="_ _2" />
                            La
                            <span className="_ _6" />
                            ndlor
                            <span className="_ _6" />
                            d’s fa
                            <span className="_ _1" />
                            ilu
                            <span className="_ _6" />
                            re <span className="_ _2" />t<span className="_ _6" />o{" "}
                        </div>
                        <div className="t m0 x3 h4 y31 ff3 fs2 fc0 sc0 ls0 ws0">
                            fil
                            <span className="_ _6" />e <span className="_ _3" />a{" "}
                            <span className="_ _3" />
                            cla
                            <span className="_ _6" />
                            im <span className="_ _3" />
                            in
                            <span className="_ _6" /> <span className="_ _5" />
                            ba
                            <span className="_ _6" />
                            nkrupt
                            <span className="_ _6" />
                            cy, <span className="_ _2" />
                            or <span className="_ _2" />
                            (vi
                            <span className="_ _6" />
                            i) <span className="_ _3" />
                            an
                            <span className="_ _6" />y <span className="_ _3" />
                            other
                            <span className="_ _6" /> <span className="_ _3" />
                            caus
                            <span className="_ _6" />
                            e. <span className="_ _2" /> <span className="_ _3" />{" "}
                            <span className="_ _5" />
                            Gu
                            <span className="_ _6" />
                            arant
                            <span className="_ _6" />
                            or <span className="_ _2" />
                            waives
                            <span className="_ _6" /> <span className="_ _3" />
                            any
                            <span className="_ _6" /> <span className="_ _3" />
                            right
                            <span className="_ _6" /> <span className="_ _3" />
                            of <span className="_ _3" />
                            sub
                            <span className="_ _6" />
                            roga
                            <span className="_ _6" />
                            tion
                            <span className="_ _1" /> <span className="_ _3" />
                            and
                            <span className="_ _6" /> <span className="_ _5" />
                            al
                            <span className="_ _6" />l <span className="_ _3" />
                            dema
                            <span className="_ _6" />
                            nds <span className="_ _2" />
                            upo
                            <span className="_ _6" />n <span className="_ _3" />
                            and
                            <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y32 ff3 fs2 fc0 sc0 ls0 ws0">
                            not
                            <span className="_ _1" />
                            ic
                            <span className="_ _6" />
                            es <span className="_ _4"> </span>to <span className="_ _4"> </span>
                            Tenan
                            <span className="_ _6" />t <span className="_ _4"> </span>and{" "}
                            <span className="_ _4"> </span>to <span className="_ _5"> </span>Guar
                            <span className="_ _6" />
                            antor
                            <span className="_ _1" />, <span className="_ _4"> </span>inc
                            <span className="_ _6" />
                            ludi
                            <span className="_ _1" />
                            ng,
                            <span className="_ _6" /> <span className="_ _a"> </span>wi
                            <span className="_ _1" />
                            th
                            <span className="_ _1" />
                            out
                            <span className="_ _6" /> <span className="_ _a"> </span>limi
                            <span className="_ _6" />
                            tati
                            <span className="_ _6" />
                            on, <span className="_ _4"> </span>dem
                            <span className="_ _6" />
                            ands <span className="_ _5"> </span>for{" "}
                            <span className="_ _4"> </span>per
                            <span className="_ _6" />
                            forma
                            <span className="_ _6" />
                            nce, <span className="_ _5" />
                            noti
                            <span className="_ _6" />
                            ces <span className="_ _4"> </span>of <span className="_ _4"> </span>
                            no
                            <span className="_ _1" />
                            npe
                            <span className="_ _6" />
                            rform
                            <span className="_ _6" />
                            ance
                            <span className="_ _6" />,{" "}
                        </div>
                        <div className="t m0 x3 h4 y33 ff3 fs2 fc0 sc0 ls0 ws0">
                            not
                            <span className="_ _1" />
                            ic
                            <span className="_ _6" />
                            es of <span className="_ _6" />
                            non
                            <span className="_ _6" />
                            -paym
                            <span className="_ _6" />
                            ent,
                            <span className="_ _1" /> an
                            <span className="_ _6" />d no
                            <span className="_ _1" />
                            tic
                            <span className="_ _6" />
                            es o<span className="_ _6" />f ac
                            <span className="_ _1" />
                            cep
                            <span className="_ _6" />
                            tance
                            <span className="_ _6" /> of t<span className="_ _6" />
                            his <span className="_ _6" />
                            Guar
                            <span className="_ _6" />
                            anty. <span className="_ _6" /> Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />
                            or wa
                            <span className="_ _6" />
                            ives <span className="_ _6" />
                            any <span className="_ _6" />
                            defens
                            <span className="_ _6" />
                            es i<span className="_ _6" />t ma
                            <span className="_ _6" />y hav
                            <span className="_ _6" />e as <span className="_ _6" />a re
                            <span className="_ _1" />s<span className="_ _1" />
                            ult <span className="_ _6" />
                            of
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y34 ff3 fs2 fc0 sc0 ls0 ws0">
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />
                            d’s e<span className="_ _6" />
                            lecti
                            <span className="_ _6" />
                            on o<span className="_ _6" />f an
                            <span className="_ _6" />y re
                            <span className="_ _1" />
                            me
                            <span className="_ _1" />
                            dy <span className="_ _6" />
                            agai
                            <span className="_ _6" />
                            nst i<span className="_ _6" />t o<span className="_ _6" />r Tena
                            <span className="_ _6" />
                            nt <span className="_ _1" />
                            or <span className="_ _6" />
                            both
                            <span className="_ _6" />.
                        </div>
                        <div className="t m0 x3 h4 y35 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y36 ff2 fs2 fc0 sc0 ls0 ws0">
                            6.
                            <span className="_ _6" /> <span className="_ _a"> </span>Guara
                            <span className="_ _6" />
                            ntor
                            <span className="_ _6" /> <span className="_ _a"> </span>Sub
                            <span className="_ _6" />
                            ordi
                            <span className="_ _1" />
                            na
                            <span className="_ _1" />
                            tio
                            <span className="_ _6" />
                            n. <span className="_ _4"> </span> <span className="_ _a"> </span>
                            <span className="ff3">
                                G<span className="_ _1" />
                                uar
                                <span className="_ _6" />
                                antor
                                <span className="_ _6" /> <span className="_ _a"> </span>su
                                <span className="_ _6" />
                                bordi
                                <span className="_ _6" />
                                nate
                                <span className="_ _6" />s <span className="_ _4"> </span>all{" "}
                                <span className="_ _5"> </span>exis
                                <span className="_ _1" />
                                tin
                                <span className="_ _6" />g <span className="_ _4"> </span>or{" "}
                                <span className="_ _4"> </span>fut
                                <span className="_ _6" />
                                ure <span className="_ _4"> </span>ind
                                <span className="_ _6" />
                                ebte
                                <span className="_ _6" />
                                dness
                                <span className="_ _6" /> <span className="_ _4"> </span>of{" "}
                                <span className="_ _4"> </span>Tena
                                <span className="_ _6" />
                                nt <span className="_ _4"> </span>to <span className="_ _4"> </span>
                                Gua
                                <span className="_ _6" />
                                ranto
                                <span className="_ _6" />r <span className="_ _4"> </span>to{" "}
                                <span className="_ _4"> </span>the
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                    </div>
                    <div
                        className="pi"
                        data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
                    />
                </div>
                <div id="pf2" className="pf w0 h0" data-page-no={2}>
                    <div className="pc pc2 w0 h0">
                        <img
                            className="bi x0 y0 w1 h1 image_layout_2"
                        />
                        <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x1 h2 y2 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="c x4 y37 w2 h6">
                            <div className="t m0 x0 h7 y38 ff3 fs0 fc0 sc0 ls0 ws0">2</div>
                        </div>
                        <div className="c x5 y37 w3 h6">
                            <div className="t m0 x0 h7 y38 ff3 fs0 fc0 sc0 ls0 ws0"> </div>
                        </div>
                        <div className="t m0 x3 h4 y39 ff3 fs2 fc0 sc0 ls0 ws0">
                            obl
                            <span className="_ _1" />
                            ig
                            <span className="_ _1" />
                            ati
                            <span className="_ _6" />
                            ons
                            <span className="_ _1" /> ow
                            <span className="_ _6" />
                            ed t<span className="_ _6" />o La
                            <span className="_ _1" />
                            ndl
                            <span className="_ _6" />
                            ord u<span className="_ _6" />
                            nder <span className="_ _6" />
                            the
                            <span className="_ _6" /> Leas
                            <span className="_ _6" />e a<span className="_ _1" />
                            nd <span className="_ _6" />
                            this
                            <span className="_ _6" /> Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _1" />
                            y.{" "}
                        </div>
                        <div className="t m0 x3 h5 y3a ff2 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y3b ff2 fs2 fc0 sc0 ls0 ws0">
                            7. <span className="_ _6" /> No <span className="_ _1" />
                            Rep
                            <span className="_ _6" />
                            orti
                            <span className="_ _6" />
                            ng Du
                            <span className="_ _6" />
                            ty. <span className="_ _6" />{" "}
                            <span className="ff3">
                                Gua
                                <span className="_ _6" />
                                rant
                                <span className="_ _6" />
                                or as
                                <span className="_ _6" />
                                sume
                                <span className="_ _1" />s <span className="_ _6" />
                                full
                                <span className="_ _6" /> res
                                <span className="_ _1" />
                                pon
                                <span className="_ _6" />
                                sibi
                                <span className="_ _6" />
                                lit
                                <span className="_ _1" />y f<span className="_ _6" />
                                or ke
                                <span className="_ _6" />
                                epin
                                <span className="_ _6" />g ful
                                <span className="_ _6" />
                                ly i<span className="_ _6" />
                                nfor
                                <span className="_ _6" />
                                med <span className="_ _1" />
                                of <span className="_ _6" />
                                the <span className="_ _6" />
                                fina
                                <span className="_ _1" />
                                nci
                                <span className="_ _1" />
                                al
                                <span className="_ _6" /> con
                                <span className="_ _1" />
                                dit
                                <span className="_ _6" />
                                ion
                                <span className="_ _1" /> of
                                <span className="_ _6" /> Tena
                                <span className="_ _6" />
                                nt{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y3c ff3 fs2 fc0 sc0 ls0 ws0">
                            and
                            <span className="_ _6" /> all ot
                            <span className="_ _6" />
                            her ci
                            <span className="_ _6" />
                            rcu
                            <span className="_ _6" />
                            msta
                            <span className="_ _6" />
                            nces a<span className="_ _6" />
                            ffe
                            <span className="_ _1" />
                            cti
                            <span className="_ _6" />
                            ng Ten
                            <span className="_ _6" />
                            ant’
                            <span className="_ _6" />s abi
                            <span className="_ _6" />
                            lity
                            <span className="_ _1" /> to <span className="_ _1" />
                            per
                            <span className="_ _6" />
                            for
                            <span className="_ _6" />m Tena
                            <span className="_ _6" />
                            nt‘s o<span className="_ _6" />
                            blig
                            <span className="_ _6" />
                            ation
                            <span className="_ _6" />s un
                            <span className="_ _1" />
                            der t<span className="_ _6" />
                            he A<span className="_ _6" />
                            greem
                            <span className="_ _1" />
                            ent
                            <span className="_ _6" />. Gu
                            <span className="_ _1" />
                            ara
                            <span className="_ _6" />
                            ntor
                            <span className="_ _6" /> agree
                            <span className="_ _6" />s{" "}
                        </div>
                        <div className="t m0 x3 h4 y3d ff3 fs2 fc0 sc0 ls0 ws0">
                            that
                            <span className="_ _6" /> <span className="_ _a"> </span>Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _1" />d <span className="_ _4"> </span>will{" "}
                            <span className="_ _4"> </span>ha
                            <span className="_ _1" />
                            ve <span className="_ _4"> </span>no <span className="_ _4"> </span>
                            dut
                            <span className="_ _1" />y <span className="_ _4"> </span>to{" "}
                            <span className="_ _a"> </span>rep
                            <span className="_ _6" />
                            ort <span className="_ _4"> </span>to <span className="_ _4"> </span>
                            Guar
                            <span className="_ _6" />
                            anto
                            <span className="_ _1" />r <span className="_ _4"> </span>any{" "}
                            <span className="_ _4"> </span>inf
                            <span className="_ _6" />
                            ormati
                            <span className="_ _6" />
                            on <span className="_ _4"> </span>that
                            <span className="_ _6" /> <span className="_ _b"> </span>La
                            <span className="_ _6" />
                            ndlo
                            <span className="_ _1" />
                            rd <span className="_ _4"> </span>re
                            <span className="_ _1" />
                            cei
                            <span className="_ _1" />
                            ves <span className="_ _4"> </span>ab
                            <span className="_ _6" />
                            out <span className="_ _a"> </span>Te
                            <span className="_ _6" />
                            nant’s
                            <span className="_ _6" /> <span className="_ _4"> </span>financ
                            <span className="_ _6" />
                            ial
                            <span className="_ _1" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y3e ff3 fs2 fc0 sc0 ls0 ws0">
                            con
                            <span className="_ _6" />
                            diti
                            <span className="_ _6" />
                            on o<span className="_ _1" />r <span className="_ _6" />a
                            <span className="_ _2" />n<span className="_ _1" />y c
                            <span className="_ _6" />
                            ircu
                            <span className="_ _6" />
                            mstan
                            <span className="_ _6" />
                            ces <span className="_ _6" />
                            bea
                            <span className="_ _1" />
                            rin
                            <span className="_ _6" />g on <span className="_ _6" />
                            Tena
                            <span className="_ _6" />
                            nt’s
                            <span className="_ _6" /> abil
                            <span className="_ _6" />
                            ity <span className="_ _6" />
                            to p<span className="_ _6" />
                            erf
                            <span className="_ _1" />
                            orm
                            <span className="_ _6" /> any
                            <span className="_ _1" /> ob
                            <span className="_ _6" />
                            ligat
                            <span className="_ _6" />
                            ion
                            <span className="_ _6" />
                            s.{" "}
                        </div>
                        <div className="t m0 x3 h4 y3f ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y40 ff2 fs2 fc0 sc0 ls0 ws0">
                            8.
                            <span className="_ _6" /> <span className="_ _a"> </span>{" "}
                            <span className="_ _a"> </span>Lea
                            <span className="_ _6" />
                            se <span className="_ _4"> </span>Exten
                            <span className="_ _6" />
                            si
                            <span className="_ _6" />
                            ons, <span className="_ _4"> </span>Am
                            <span className="_ _6" />
                            endmen
                            <span className="_ _6" />
                            ts, <span className="_ _5"> </span>Assi
                            <span className="_ _6" />
                            gnmen
                            <span className="_ _6" />
                            ts <span className="_ _4"> </span>and
                            <span className="_ _6" /> <span className="_ _a"> </span>Sub
                            <span className="_ _6" />
                            letti
                            <span className="_ _6" />
                            ng. <span className="_ _4"> </span> <span className="_ _a"> </span>
                            <span className="ff3">
                                Gua
                                <span className="_ _6" />
                                ra
                                <span className="_ _1" />
                                nto
                                <span className="_ _1" />r <span className="_ _5"> </span>agrees
                                <span className="_ _6" /> <span className="_ _4"> </span>that
                                <span className="_ _6" /> <span className="_ _a"> </span>the
                                <span className="_ _6" /> <span className="_ _a"> </span>Leas
                                <span className="_ _6" />e <span className="_ _4"> </span>may{" "}
                                <span className="_ _5"> </span>be <span className="_ _4"> </span>
                                exte
                                <span className="_ _6" />
                                nde
                                <span className="_ _1" />
                                d,
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y41 ff3 fs2 fc0 sc0 ls0 ws0">
                            ren
                            <span className="_ _6" />
                            ewed,
                            <span className="_ _6" /> <span className="_ _5" />m
                            <span className="_ _1" />
                            od
                            <span className="_ _6" />
                            ified
                            <span className="_ _6" />, <span className="_ _3" />
                            ass
                            <span className="_ _6" />
                            igne
                            <span className="_ _6" />d <span className="_ _3" />
                            or <span className="_ _3" />
                            su
                            <span className="_ _6" />
                            blet <span className="_ _2" />
                            (by
                            <span className="_ _6" /> <span className="_ _5" />a
                            <span className="_ _6" />
                            gree
                            <span className="_ _1" />
                            men
                            <span className="_ _6" />t <span className="_ _3" />
                            or <span className="_ _2" />
                            cour
                            <span className="_ _6" />
                            se <span className="_ _2" />
                            of <span className="_ _3" />
                            co
                            <span className="_ _6" />
                            nduct
                            <span className="_ _6" />) <span className="_ _3" />
                            wit
                            <span className="_ _6" />
                            hout <span className="_ _2" />
                            cons
                            <span className="_ _6" />
                            ent
                            <span className="_ _1" /> <span className="_ _3" />
                            or <span className="_ _2" />
                            noti
                            <span className="_ _6" />
                            ce <span className="_ _3" />t<span className="_ _1" />o{" "}
                            <span className="_ _2" />
                            Guar
                            <span className="_ _6" />
                            antor
                            <span className="_ _6" /> <span className="_ _3" />
                            and <span className="_ _2" />
                            thi
                            <span className="_ _6" />s{" "}
                        </div>
                        <div className="t m0 x3 h4 y42 ff3 fs2 fc0 sc0 ls0 ws0">
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />y <span className="_ _b"> </span>will{" "}
                            <span className="_ _4"> </span>guara
                            <span className="_ _6" />
                            nty <span className="_ _a"> </span>the <span className="_ _4"> </span>
                            perfo
                            <span className="_ _6" />
                            rmanc
                            <span className="_ _6" />e <span className="_ _b"> </span>of{" "}
                            <span className="_ _a"> </span>the
                            <span className="_ _1" /> <span className="_ _a"> </span>Lease
                            <span className="_ _6" /> <span className="_ _7"> </span>as
                            <span className="_ _6" /> <span className="_ _b"> </span>exte
                            <span className="_ _6" />
                            nded,
                            <span className="_ _6" /> <span className="_ _b"> </span>ren
                            <span className="_ _1" />
                            ewe
                            <span className="_ _6" />
                            d, <span className="_ _a"> </span>modifi
                            <span className="_ _6" />
                            ed,
                            <span className="_ _6" /> <span className="_ _b"> </span>ass
                            <span className="_ _6" />
                            igned
                            <span className="_ _1" /> <span className="_ _b"> </span>or{" "}
                            <span className="_ _a"> </span>sub
                            <span className="_ _6" />
                            let. <span className="_ _a"> </span> <span className="_ _b"> </span>An
                            <span className="_ _1" />y <span className="_ _a"> </span>act{" "}
                            <span className="_ _a"> </span>of{" "}
                        </div>
                        <div className="t m0 x3 h4 y43 ff3 fs2 fc0 sc0 ls0 ws0">
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />
                            d, <span className="_ _3" />
                            cons
                            <span className="_ _6" />
                            isti
                            <span className="_ _6" />
                            ng <span className="_ _3" />
                            of
                            <span className="_ _6" /> <span className="_ _5" />a
                            <span className="_ _1" /> <span className="_ _3" />
                            modi
                            <span className="_ _6" />
                            ficat
                            <span className="_ _1" />i<span className="_ _1" />
                            on <span className="_ _2" />
                            of <span className="_ _3" />t<span className="_ _1" />
                            he <span className="_ _2" />
                            Leas
                            <span className="_ _6" />
                            e, <span className="_ _3" />a <span className="_ _2" />
                            waive
                            <span className="_ _6" />r <span className="_ _3" />
                            of <span className="_ _2" />
                            any <span className="_ _2" />
                            of <span className="_ _3" />
                            the
                            <span className="_ _6" /> <span className="_ _3" />
                            terms
                            <span className="_ _6" /> <span className="_ _3" />
                            or <span className="_ _3" />
                            co
                            <span className="_ _1" />
                            ndi
                            <span className="_ _1" />
                            ti
                            <span className="_ _6" />
                            ons <span className="_ _2" />
                            of <span className="_ _2" />
                            the <span className="_ _2" />
                            Leas
                            <span className="_ _1" />
                            e, <span className="_ _2" />
                            or <span className="_ _2" />
                            givi
                            <span className="_ _6" />
                            ng <span className="_ _2" />
                            any
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y44 ff3 fs2 fc0 sc0 ls0 ws0">
                            cons
                            <span className="_ _6" />
                            ent
                            <span className="_ _1" />, <span className="_ _2" />
                            or <span className="_ _2" />
                            gra
                            <span className="_ _6" />
                            ntin
                            <span className="_ _6" />g <span className="_ _3" />
                            any
                            <span className="_ _6" /> <span className="_ _3" />
                            indul
                            <span className="_ _6" />
                            gen
                            <span className="_ _1" />
                            ces
                            <span className="_ _6" /> <span className="_ _3" />
                            or
                            <span className="_ _6" /> <span className="_ _5" />
                            ex
                            <span className="_ _6" />
                            tensi
                            <span className="_ _6" />
                            ons <span className="_ _2" />
                            of
                            <span className="_ _6" /> <span className="_ _3" />
                            time <span className="_ _2" />
                            to
                            <span className="_ _6" /> <span className="_ _3" />
                            Tena
                            <span className="_ _6" />
                            nt, <span className="_ _2" />
                            are
                            <span className="_ _6" /> <span className="_ _3" />
                            deem
                            <span className="_ _6" />
                            ed <span className="_ _2" />
                            appr
                            <span className="_ _6" />
                            oved
                            <span className="_ _6" /> <span className="_ _3" />
                            by <span className="_ _2" />
                            Guar
                            <span className="_ _6" />
                            antor
                            <span className="_ _6" /> <span className="_ _3" />
                            and
                            <span className="_ _6" /> <span className="_ _3" />
                            may <span className="_ _2" />
                            ge
                            <span className="_ _6" /> <span className="_ _5" />d
                            <span className="_ _6" />
                            one{" "}
                        </div>
                        <div className="t m0 x3 h4 y45 ff3 fs2 fc0 sc0 ls0 ws0">
                            wit
                            <span className="_ _6" />
                            hout
                            <span className="_ _6" /> noti
                            <span className="_ _6" />
                            ce t<span className="_ _1" />o <span className="_ _6" />
                            Guara
                            <span className="_ _6" />
                            ntor
                            <span className="_ _6" /> an
                            <span className="_ _6" />d wit
                            <span className="_ _6" />
                            hout <span className="_ _6" />
                            rele
                            <span className="_ _6" />
                            asin
                            <span className="_ _6" />g Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _1" />
                            or
                            <span className="_ _6" /> fr
                            <span className="_ _1" />
                            om <span className="_ _1" />
                            any
                            <span className="_ _6" /> of <span className="_ _1" />
                            its
                            <span className="_ _6" /> ob
                            <span className="_ _6" />
                            ligat
                            <span className="_ _6" />
                            ions
                            <span className="_ _1" /> u<span className="_ _6" />
                            nder <span className="_ _6" />
                            this
                            <span className="_ _6" /> Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />
                            y.
                        </div>
                        <div className="t m0 x3 h4 y46 ff3 fs2 fc0 sc0 ls0 ws0">
                            {" "}
                            <span className="_ _d"> </span>{" "}
                        </div>
                        <div className="t m0 x3 h5 y47 ff2 fs2 fc0 sc0 ls0 ws0">
                            9. <span className="_ _2" /> <span className="_ _3" />
                            Est
                            <span className="_ _6" />
                            oppel
                            <span className="_ _6" /> <span className="_ _3" />
                            Certi
                            <span className="_ _6" />
                            fic
                            <span className="_ _6" />
                            ates
                            <span className="_ _6" /> <span className="_ _5" />
                            an
                            <span className="_ _6" />d <span className="_ _2" />
                            Finan
                            <span className="_ _6" />
                            cial
                            <span className="_ _6" /> <span className="_ _3" />
                            Stat
                            <span className="_ _6" />
                            emen
                            <span className="_ _6" />
                            ts. <span className="_ _2" /> <span className="_ _3" />
                            <span className="ff3">
                                If <span className="_ _2" />
                                Ten
                                <span className="_ _6" />
                                ant <span className="_ _2" />
                                has <span className="_ _2" />
                                any <span className="_ _2" />o<span className="_ _1" />
                                blig
                                <span className="_ _6" />
                                atio
                                <span className="_ _6" />n <span className="_ _3" />
                                to <span className="_ _2" />
                                si
                                <span className="_ _6" />
                                gn <span className="_ _2" />
                                and <span className="_ _2" />
                                deli
                                <span className="_ _6" />
                                ver <span className="_ _2" />
                                est
                                <span className="_ _1" />
                                op
                                <span className="_ _6" />
                                pel <span className="_ _2" />
                                cert
                                <span className="_ _6" />
                                ific
                                <span className="_ _6" />
                                ates
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y48 ff3 fs2 fc0 sc0 ls0 ws0">
                            and
                            <span className="_ _6" /> <span className="_ _2" />
                            fin
                            <span className="_ _6" />
                            anci
                            <span className="_ _1" />
                            al
                            <span className="_ _1" /> <span className="_ _2" />
                            st
                            <span className="_ _6" />
                            ate
                            <span className="_ _1" />
                            ment
                            <span className="_ _6" />
                            s, Gua
                            <span className="_ _6" />
                            ranto
                            <span className="_ _6" />r <span className="_ _2" />
                            wi
                            <span className="_ _1" />
                            ll
                            <span className="_ _6" /> <span className="_ _2" />
                            hav
                            <span className="_ _1" />e the
                            <span className="_ _6" /> <span className="_ _2" />
                            same
                            <span className="_ _6" /> <span className="_ _2" />
                            obl
                            <span className="_ _6" />
                            igat
                            <span className="_ _6" />
                            ion to pr
                            <span className="_ _1" />
                            ovi
                            <span className="_ _6" />
                            de est
                            <span className="_ _6" />
                            oppel
                            <span className="_ _6" /> <span className="_ _2" />
                            cert
                            <span className="_ _6" />
                            ific
                            <span className="_ _6" />
                            ates
                            <span className="_ _6" /> <span className="_ _2" />
                            si
                            <span className="_ _1" />
                            gne
                            <span className="_ _6" />d <span className="_ _2" />
                            by
                            <span className="_ _6" /> <span className="_ _2" />
                            Guar
                            <span className="_ _1" />
                            an
                            <span className="_ _6" />
                            tor and
                            <span className="_ _6" /> <span className="_ _2" />t
                            <span className="_ _6" />o{" "}
                        </div>
                        <div className="t m0 x3 h4 y49 ff3 fs2 fc0 sc0 ls0 ws0">
                            pro
                            <span className="_ _6" />
                            vide
                            <span className="_ _6" /> Guar
                            <span className="_ _6" />
                            anto
                            <span className="_ _1" />
                            r’s
                            <span className="_ _6" /> fi
                            <span className="_ _1" />
                            na
                            <span className="_ _6" />
                            ncial
                            <span className="_ _6" /> sta
                            <span className="_ _6" />
                            temen
                            <span className="_ _6" />
                            ts. <span className="_ _6" />
                        </div>
                        <div className="t m0 x3 h5 y4a ff2 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y4b ff2 fs2 fc0 sc0 ls0 ws0">
                            10.
                            <span className="_ _6" /> J<span className="_ _1" />
                            oint
                            <span className="_ _6" /> and
                            <span className="_ _6" /> Sev
                            <span className="_ _1" />
                            er
                            <span className="_ _1" />
                            al
                            <span className="_ _1" /> Ob
                            <span className="_ _6" />
                            liga
                            <span className="_ _6" />
                            tion
                            <span className="_ _1" />
                            s.
                            <span className="_ _1" /> <span className="_ _6" />
                            <span className="ff3">
                                If <span className="_ _5" />
                                thi
                                <span className="_ _6" />s <span className="_ _5" />
                                Gu
                                <span className="_ _1" />
                                ara
                                <span className="_ _6" />
                                nty
                                <span className="_ _6" /> <span className="_ _5"> </span>is{" "}
                                <span className="_ _5" />
                                si
                                <span className="_ _6" />
                                gned <span className="_ _3" />
                                by <span className="_ _3" />
                                more
                                <span className="_ _6" /> <span className="_ _5"> </span>tha
                                <span className="_ _1" />n <span className="_ _3" />
                                one <span className="_ _3" />
                                part
                                <span className="_ _1" />
                                y,
                                <span className="_ _6" /> <span className="_ _5"> </span>or{" "}
                                <span className="_ _5" />
                                if <span className="_ _3" />
                                the
                                <span className="_ _6" /> <span className="_ _5" />
                                obli
                                <span className="_ _6" />
                                gati
                                <span className="_ _6" />
                                ons
                                <span className="_ _6" /> <span className="_ _5"> </span>of{" "}
                                <span className="_ _5" />
                                Ten
                                <span className="_ _6" />
                                ant
                                <span className="_ _1" /> <span className="_ _5" />
                                are
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y4c ff3 fs2 fc0 sc0 ls0 ws0">
                            oth
                            <span className="_ _6" />
                            erwis
                            <span className="_ _6" />e gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />
                            eed b<span className="_ _1" />y mo
                            <span className="_ _6" />
                            re than
                            <span className="_ _6" /> one <span className="_ _6" />
                            party
                            <span className="_ _6" />, the
                            <span className="_ _1" />
                            ir
                            <span className="_ _6" /> obli
                            <span className="_ _6" />
                            gati
                            <span className="_ _6" />
                            ons wi
                            <span className="_ _6" />
                            ll be j<span className="_ _6" />
                            oint
                            <span className="_ _6" /> and se
                            <span className="_ _6" />
                            veral
                            <span className="_ _6" />, an
                            <span className="_ _6" />d a rele
                            <span className="_ _6" />
                            ase o<span className="_ _6" />r li
                            <span className="_ _1" />
                            abil
                            <span className="_ _6" />
                            ity l<span className="_ _6" />
                            imita
                            <span className="_ _6" />
                            tio
                            <span className="_ _1" />n of
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y4d ff3 fs2 fc0 sc0 ls0 ws0">
                            any
                            <span className="_ _6" /> one
                            <span className="_ _6" /> or <span className="_ _6" />
                            more <span className="_ _6" />
                            of th
                            <span className="_ _6" />e gu
                            <span className="_ _6" />
                            aran
                            <span className="_ _6" />
                            tors <span className="_ _6" />
                            wil
                            <span className="_ _1" />l <span className="_ _6" />
                            not r<span className="_ _6" />
                            eleas
                            <span className="_ _6" />e o<span className="_ _1" />r l
                            <span className="_ _6" />
                            imit
                            <span className="_ _1" /> t<span className="_ _6" />
                            he l<span className="_ _6" />
                            iabi
                            <span className="_ _1" />
                            lit
                            <span className="_ _6" />y of
                            <span className="_ _6" /> any
                            <span className="_ _6" /> othe
                            <span className="_ _6" />r gu
                            <span className="_ _6" />
                            aran
                            <span className="_ _6" />
                            tors
                            <span className="_ _1" />.{" "}
                        </div>
                        <div className="t m0 x3 h4 y4e ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y4f ff2 fs2 fc0 sc0 ls0 ws0">
                            11.
                            <span className="_ _6" /> <span className="_ _3" />{" "}
                            <span className="_ _5" />
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />d <span className="_ _3" />
                            Righ
                            <span className="_ _6" />
                            ts,
                            <span className="_ _1" /> <span className="_ _3" />
                            Wai
                            <span className="_ _1" />
                            ver
                            <span className="_ _6" />, <span className="_ _5" />R
                            <span className="_ _6" />
                            elea
                            <span className="_ _6" />
                            se <span className="_ _3" />
                            and
                            <span className="_ _6" /> <span className="_ _5" />A
                            <span className="_ _6" />m<span className="_ _2" />
                            en
                            <span className="_ _6" />
                            dment
                            <span className="_ _6" />. <span className="_ _3" />{" "}
                            <span className="_ _5" />
                            <span className="ff3">
                                A<span className="_ _1" />
                                ll
                                <span className="_ _6" /> <span className="_ _5" />
                                La
                                <span className="_ _6" />
                                ndlo
                                <span className="_ _1" />
                                rd
                                <span className="_ _6" /> <span className="_ _5" />
                                rem
                                <span className="_ _1" />
                                ed
                                <span className="_ _6" />
                                ies <span className="_ _2" />
                                agai
                                <span className="_ _6" />
                                nst
                                <span className="_ _1" /> <span className="_ _3" />
                                Gua
                                <span className="_ _1" />
                                ran
                                <span className="_ _6" />
                                tor <span className="_ _2" />
                                are
                                <span className="_ _6" /> <span className="_ _5" />
                                cum
                                <span className="_ _6" />
                                ulati
                                <span className="_ _6" />
                                ve.
                                <span className="_ _1" /> <span className="_ _2" />{" "}
                                <span className="_ _5" />
                                No
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y50 ff3 fs2 fc0 sc0 ls0 ws0">
                            Lan
                            <span className="_ _6" />
                            dlor
                            <span className="_ _6" />d <span className="_ _2" />
                            rig
                            <span className="_ _6" />
                            hts und
                            <span className="_ _6" />
                            er thi
                            <span className="_ _1" />s Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _6" />y <span className="_ _2" />
                            ca
                            <span className="_ _6" />n <span className="_ _2" />
                            be
                            <span className="_ _1" /> <span className="_ _2" />
                            wa
                            <span className="_ _1" />
                            iv
                            <span className="_ _1" />
                            ed
                            <span className="_ _6" /> <span className="_ _2" />
                            or mod
                            <span className="_ _1" />i<span className="_ _1" />
                            fie
                            <span className="_ _6" />
                            d, <span className="_ _2" />n<span className="_ _6" />
                            or will
                            <span className="_ _6" /> <span className="_ _2" />
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _1" />
                            or be
                            <span className="_ _6" /> <span className="_ _2" />
                            rel
                            <span className="_ _1" />
                            eas
                            <span className="_ _6" />
                            ed from
                            <span className="_ _6" /> <span className="_ _2" />
                            Gua
                            <span className="_ _6" />
                            ranto
                            <span className="_ _6" />
                            r’s
                            <span className="_ _6" /> <span className="_ _2" />
                            obli
                            <span className="_ _6" />
                            gati
                            <span className="_ _6" />
                            ons{" "}
                        </div>
                        <div className="t m0 x3 h4 y51 ff3 fs2 fc0 sc0 ls0 ws0">
                            und
                            <span className="_ _6" />
                            er t<span className="_ _6" />
                            his G<span className="_ _6" />
                            uara
                            <span className="_ _6" />
                            nty,
                            <span className="_ _6" /> exce
                            <span className="_ _6" />
                            pt i<span className="_ _6" />n a <span className="_ _6" />
                            writi
                            <span className="_ _6" />
                            ng, <span className="_ _6" />
                            sig
                            <span className="_ _1" />
                            ned <span className="_ _6" />
                            by <span className="_ _6" />L<span className="_ _2" />a
                            <span className="_ _6" />
                            ndlor
                            <span className="_ _6" />
                            d. <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y52 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y53 ff2 fs2 fc0 sc0 ls0 ws0">
                            12.
                            <span className="_ _6" /> Suc
                            <span className="_ _6" />
                            cess
                            <span className="_ _6" />
                            ors a<span className="_ _6" />
                            nd A<span className="_ _6" />
                            ssi
                            <span className="_ _1" />
                            gns
                            <span className="_ _6" />.{" "}
                            <span className="ff3">
                                T<span className="_ _6" />
                                his <span className="_ _2" />
                                Gu
                                <span className="_ _6" />
                                arant
                                <span className="_ _6" />y <span className="_ _2" />
                                will
                                <span className="_ _6" /> <span className="_ _2" />
                                be <span className="_ _2" />
                                bi
                                <span className="_ _6" />
                                ndin
                                <span className="_ _6" />g <span className="_ _2" />
                                upon Gua
                                <span className="_ _1" />
                                ra
                                <span className="_ _6" />
                                ntor and
                                <span className="_ _1" /> <span className="_ _2" />
                                Gua
                                <span className="_ _1" />
                                ra
                                <span className="_ _6" />
                                ntor'
                                <span className="_ _6" />s <span className="_ _2" />
                                heir
                                <span className="_ _6" />
                                s, <span className="_ _2" />a<span className="_ _1" />
                                dmi
                                <span className="_ _6" />
                                nistr
                                <span className="_ _6" />
                                ato
                                <span className="_ _6" />
                                rs, <span className="_ _2" />
                                per
                                <span className="_ _6" />
                                son
                                <span className="_ _1" />
                                al
                                <span className="_ _6" />{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y54 ff3 fs2 fc0 sc0 ls0 ws0">
                            and
                            <span className="_ _6" /> <span className="_ _5"> </span>legal
                            <span className="_ _6" /> <span className="_ _5" />
                            rep
                            <span className="_ _6" />
                            rese
                            <span className="_ _6" />
                            ntati
                            <span className="_ _6" />
                            ves,
                            <span className="_ _6" /> <span className="_ _5"> </span>succ
                            <span className="_ _6" />
                            essor
                            <span className="_ _6" />
                            s, <span className="_ _5" />a<span className="_ _1" />
                            nd <span className="_ _3" />
                            ass
                            <span className="_ _6" />
                            igns
                            <span className="_ _6" />, <span className="_ _5" />
                            and
                            <span className="_ _6" /> <span className="_ _5"> </span>will
                            <span className="_ _6" /> <span className="_ _5"> </span>inur
                            <span className="_ _6" />e <span className="_ _5" />
                            to <span className="_ _3" />
                            the
                            <span className="_ _6" /> <span className="_ _5"> </span>bene
                            <span className="_ _1" />
                            fit
                            <span className="_ _6" /> <span className="_ _5" />
                            of <span className="_ _3" />
                            Land
                            <span className="_ _1" />l<span className="_ _1" />
                            ord <span className="_ _3" />
                            and
                            <span className="_ _1" /> <span className="_ _5" />
                            La
                            <span className="_ _6" />
                            ndlo
                            <span className="_ _1" />
                            rd'
                            <span className="_ _6" />s <span className="_ _5" />
                            su
                            <span className="_ _1" />
                            cce
                            <span className="_ _1" />
                            ss
                            <span className="_ _6" />
                            ors <span className="_ _3" />
                            and
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y55 ff3 fs2 fc0 sc0 ls0 ws0">
                            ass
                            <span className="_ _6" />
                            igns.
                            <span className="_ _6" /> La
                            <span className="_ _6" />
                            ndlor
                            <span className="_ _6" />d may
                            <span className="_ _6" />, wit
                            <span className="_ _6" />
                            hou
                            <span className="_ _6" />t not
                            <span className="_ _6" />
                            ice t<span className="_ _6" />o or <span className="_ _6" />
                            cons
                            <span className="_ _6" />
                            ent <span className="_ _6" />
                            of Gu
                            <span className="_ _1" />
                            ara
                            <span className="_ _6" />
                            nto
                            <span className="_ _6" />
                            r, as
                            <span className="_ _6" />
                            sign
                            <span className="_ _6" /> this
                            <span className="_ _6" /> Gua
                            <span className="_ _6" />
                            rant
                            <span className="_ _1" />
                            y, <span className="_ _6" />
                            the A<span className="_ _6" />
                            gree
                            <span className="_ _6" />
                            ment, <span className="_ _6" />
                            or <span className="_ _6" />
                            the re
                            <span className="_ _6" />
                            nts
                            <span className="_ _1" /> an
                            <span className="_ _6" />d ot
                            <span className="_ _6" />
                            her{" "}
                        </div>
                        <div className="t m0 x3 h4 y56 ff3 fs2 fc0 sc0 ls0 ws0">
                            sum
                            <span className="_ _1" />s <span className="_ _6" />
                            payabl
                            <span className="_ _6" />e <span className="_ _1" />
                            und
                            <span className="_ _6" />
                            er t<span className="_ _1" />
                            he <span className="_ _6" />
                            Agree
                            <span className="_ _6" />
                            ment
                            <span className="_ _6" />, i<span className="_ _6" />n who
                            <span className="_ _6" />
                            le or
                            <span className="_ _6" /> in
                            <span className="_ _1" /> p<span className="_ _6" />
                            art.
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y57 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y58 ff2 fs2 fc0 sc0 ls0 ws0">
                            13.
                            <span className="_ _6" /> Gov
                            <span className="_ _6" />
                            erni
                            <span className="_ _6" />
                            ng L<span className="_ _6" />
                            aw. <span className="_ _1" />{" "}
                            <span className="ff3">
                                Thi
                                <span className="_ _6" />s Guar
                                <span className="_ _1" />
                                ant
                                <span className="_ _6" />y is made
                                <span className="_ _6" /> <span className="_ _2" />
                                un
                                <span className="_ _1" />
                                der
                                <span className="_ _6" /> <span className="_ _2" />
                                and
                                <span className="_ _6" /> <span className="_ _2" />
                                wil
                                <span className="_ _1" />l be
                                <span className="_ _6" /> <span className="_ _2" />
                                gove
                                <span className="_ _6" />
                                rne
                                <span className="_ _1" />d by Cali
                                <span className="_ _6" />
                                forn
                                <span className="_ _6" />
                                ia law
                                <span className="_ _1" /> <span className="_ _2" />i
                                <span className="_ _6" />n <span className="_ _2" />
                                all
                                <span className="_ _6" /> <span className="_ _2" />
                                res
                                <span className="_ _6" />
                                pec
                                <span className="_ _1" />
                                ts
                                <span className="_ _1" />, inc
                                <span className="_ _1" />
                                lu
                                <span className="_ _1" />
                                di
                                <span className="_ _6" />
                                ng matt
                                <span className="_ _6" />
                                ers{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y59 ff3 fs2 fc0 sc0 ls0 ws0">
                            of <span className="_ _5"> </span>cons
                            <span className="_ _6" />
                            tru
                            <span className="_ _6" />
                            ction
                            <span className="_ _6" />, <span className="_ _4"> </span>vali
                            <span className="_ _6" />
                            dit
                            <span className="_ _6" />
                            y, <span className="_ _5"> </span>and <span className="_ _5" />
                            perf
                            <span className="_ _6" />
                            orman
                            <span className="_ _6" />
                            ce.
                            <span className="_ _6" /> <span className="_ _a"> </span>Thi
                            <span className="_ _6" />s <span className="_ _4"> </span>Gu
                            <span className="_ _1" />
                            ara
                            <span className="_ _6" />
                            nty <span className="_ _5" />
                            may
                            <span className="_ _1" /> <span className="_ _4"> </span>not
                            <span className="_ _6" /> <span className="_ _4"> </span>be{" "}
                            <span className="_ _4"> </span>wai
                            <span className="_ _6" />
                            ved,
                            <span className="_ _6" /> <span className="_ _4"> </span>alter
                            <span className="_ _6" />
                            ed,
                            <span className="_ _1" /> <span className="_ _5"> </span>modifi
                            <span className="_ _6" />
                            ed,
                            <span className="_ _6" /> <span className="_ _4"> </span>or{" "}
                            <span className="_ _5"> </span>amend
                            <span className="_ _6" />
                            ed <span className="_ _5"> </span>exce
                            <span className="_ _6" />
                            pt <span className="_ _5"> </span>in <span className="_ _5" />a{" "}
                        </div>
                        <div className="t m0 x3 h4 y5a ff3 fs2 fc0 sc0 ls0 ws0">
                            wri
                            <span className="_ _6" />
                            ting <span className="_ _5" />
                            si
                            <span className="_ _1" />
                            gne
                            <span className="_ _6" />d <span className="_ _4"> </span>by{" "}
                            <span className="_ _5"> </span>an <span className="_ _4"> </span>aut
                            <span className="_ _6" />
                            horiz
                            <span className="_ _6" />
                            ed <span className="_ _4"> </span>offi
                            <span className="_ _6" />
                            cer <span className="_ _5" />
                            of <span className="_ _5"> </span>Land
                            <span className="_ _6" />
                            lord <span className="_ _5" />
                            and <span className="_ _5" />
                            by <span className="_ _5"> </span>Gua
                            <span className="_ _6" />
                            ranto
                            <span className="_ _6" />
                            r. <span className="_ _4"> </span> <span className="_ _4"> </span>Any{" "}
                            <span className="_ _5" />
                            acti
                            <span className="_ _6" />
                            on <span className="_ _4"> </span>ari
                            <span className="_ _6" />
                            sin
                            <span className="_ _6" />g <span className="_ _4"> </span>out{" "}
                            <span className="_ _5"> </span>of <span className="_ _4"> </span>thi
                            <span className="_ _1" />s <span className="_ _5"> </span>Guar
                            <span className="_ _6" />
                            anty <span className="_ _5" />
                            may <span className="_ _5" />
                            be
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y5b ff3 fs2 fc0 sc0 ls0 ws0">
                            bro
                            <span className="_ _6" />
                            ught
                            <span className="_ _1" /> i<span className="_ _6" />n the
                            <span className="_ _6" /> co
                            <span className="_ _1" />
                            unt
                            <span className="_ _1" />y w<span className="_ _6" />
                            here <span className="_ _6" />
                            th
                            <span className="_ _1" />e p<span className="_ _6" />
                            rope
                            <span className="_ _6" />
                            rty i<span className="_ _6" />s lo
                            <span className="_ _6" />
                            cated
                            <span className="_ _6" />.{" "}
                        </div>
                        <div className="t m0 x3 h5 y5c ff2 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y5d ff2 fs2 fc0 sc0 ls0 ws0">
                            14.
                            <span className="_ _6" /> Sev
                            <span className="_ _6" />
                            eran
                            <span className="_ _6" />
                            ce. <span className="_ _1" />{" "}
                            <span className="ff3">
                                If
                                <span className="_ _6" /> an
                                <span className="_ _6" />y pro
                                <span className="_ _6" />
                                vis
                                <span className="_ _1" />
                                io
                                <span className="_ _1" />n o<span className="_ _6" />f thi
                                <span className="_ _6" />s Gu
                                <span className="_ _6" />
                                aran
                                <span className="_ _6" />
                                ty is
                                <span className="_ _6" /> in
                                <span className="_ _6" />
                                vali
                                <span className="_ _1" />d <span className="_ _6" />
                                under
                                <span className="_ _6" /> the <span className="_ _6" />
                                laws
                                <span className="_ _6" /> of <span className="_ _6" />
                                any
                                <span className="_ _1" /> ju
                                <span className="_ _6" />
                                risdi
                                <span className="_ _6" />
                                ctio
                                <span className="_ _6" />
                                n, t<span className="_ _1" />
                                hi
                                <span className="_ _1" />s <span className="_ _6" />
                                Guara
                                <span className="_ _6" />
                                nty w<span className="_ _6" />
                                ill
                                <span className="_ _6" /> be{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y5e ff3 fs2 fc0 sc0 ls0 ws0">
                            cons
                            <span className="_ _6" />
                            true
                            <span className="_ _6" />d as
                            <span className="_ _6" /> if i<span className="_ _6" />t di
                            <span className="_ _6" />d n<span className="_ _6" />
                            ot c<span className="_ _6" />
                            ontai
                            <span className="_ _6" />n th
                            <span className="_ _1" />
                            at <span className="_ _6" />
                            pro
                            <span className="_ _1" />
                            vis
                            <span className="_ _6" />
                            ion.
                            <span className="_ _6" />{" "}
                        </div>
                        <div className="t m0 x3 h4 y5f ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y60 ff2 fs2 fc0 sc0 ls0 ws0">
                            15.
                            <span className="_ _6" /> Cou
                            <span className="_ _6" />
                            nterp
                            <span className="_ _6" />
                            arts
                            <span className="_ _6" /> and
                            <span className="_ _6" /> Fa
                            <span className="_ _6" />x Sig
                            <span className="_ _1" />
                            na
                            <span className="_ _1" />
                            tur
                            <span className="_ _6" />
                            es.
                            <span className="_ _1" />{" "}
                            <span className="ff3">
                                T<span className="_ _6" />
                                his <span className="_ _a"> </span>Gua
                                <span className="_ _6" />
                                ranty
                                <span className="_ _6" /> <span className="_ _a"> </span>may
                                <span className="_ _1" /> <span className="_ _a"> </span>be{" "}
                                <span className="_ _4"> </span>execut
                                <span className="_ _6" />
                                ed <span className="_ _a"> </span>in
                                <span className="_ _6" /> <span className="_ _b"> </span>cou
                                <span className="_ _6" />
                                nterp
                                <span className="_ _1" />
                                art
                                <span className="_ _6" />, <span className="_ _a"> </span>eac
                                <span className="_ _6" />h <span className="_ _a"> </span>whic
                                <span className="_ _6" />h <span className="_ _a"> </span>wil
                                <span className="_ _1" />l <span className="_ _a"> </span>be
                                <span className="_ _1" /> <span className="_ _a"> </span>a{" "}
                                <span className="_ _4"> </span>vali
                                <span className="_ _1" />d <span className="_ _a"> </span>an
                                <span className="_ _6" />d{" "}
                            </span>
                        </div>
                        <div className="t m0 x3 h4 y61 ff3 fs2 fc0 sc0 ls0 ws0">
                            bin
                            <span className="_ _6" />
                            ding
                            <span className="_ _6" /> <span className="_ _5"> </span>origi
                            <span className="_ _6" />
                            nal,
                            <span className="_ _6" /> <span className="_ _5" />
                            but
                            <span className="_ _1" /> <span className="_ _5" />
                            all
                            <span className="_ _6" /> <span className="_ _5" />
                            tog
                            <span className="_ _6" />
                            eth
                            <span className="_ _1" />
                            er <span className="_ _3" />
                            will
                            <span className="_ _1" /> <span className="_ _5" />c
                            <span className="_ _1" />
                            ons
                            <span className="_ _6" />
                            titut
                            <span className="_ _6" />e <span className="_ _5" />
                            one
                            <span className="_ _6" /> <span className="_ _5" />
                            and
                            <span className="_ _6" /> <span className="_ _5"> </span>the{" "}
                            <span className="_ _3" />
                            same
                            <span className="_ _6" /> <span className="_ _5"> </span>inst
                            <span className="_ _6" />
                            rume
                            <span className="_ _6" />
                            nt. <span className="_ _3" /> <span className="_ _5"> </span>Land
                            <span className="_ _6" />
                            lord
                            <span className="_ _6" /> <span className="_ _5"> </span>may{" "}
                            <span className="_ _3" />
                            rel
                            <span className="_ _6" />y <span className="_ _5" />
                            on <span className="_ _3" />a <span className="_ _5" />
                            fax
                            <span className="_ _6" />
                            ed <span className="_ _5" />
                            co
                            <span className="_ _6" />
                            py <span className="_ _5" />o<span className="_ _6" />f{" "}
                            <span className="_ _5" />
                            thi
                            <span className="_ _6" />s{" "}
                        </div>
                        <div className="t m0 x3 h4 y62 ff3 fs2 fc0 sc0 ls0 ws0">
                            Guar
                            <span className="_ _6" />
                            ant
                            <span className="_ _6" />y as
                            <span className="_ _1" /> if
                            <span className="_ _6" /> it w<span className="_ _6" />
                            as t<span className="_ _6" />
                            he <span className="_ _1" />
                            ori
                            <span className="_ _6" />
                            gin
                            <span className="_ _6" />
                            al.{" "}
                        </div>
                        <div className="t m0 x3 h4 y63 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y64 ff2 fs2 fc0 sc0 ls0 ws0">
                            Date
                            <span className="_ _6" />
                            :{FillFormData("guarantor_date", "350px")}
                            <span className="_ _6" />

                            <span className="_ _6" />

                            <span className="_ _1" />

                            <span className="_ _6" />

                            <span className="_ _6" />

                            <span className="ff3">
                                {" "}
                                <span className="_ _e"> </span> <span className="_ _f"> </span>{" "}
                                <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                                <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                                <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                                <span className="_ _f"> </span>{" "}
                            </span>
                        </div>
                       
                        <div className="t m0 x3 h5 y65 ff3 fs2 fc0 sc0 ls0 ws0">
                            {" "}
                            <span className="_ _10"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f">  </span>
                            <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span>
                            <span className="ff2">
                                Guar
                                <span className="_ _6" />
                                ant
                                <span className="_ _6" />
                                or{" "}
                            </span>
                           
                        </div>
                        <div className="t m0 x1 h4 y66 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y67 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                    </div>
                    <div
                        className="pi"
                        data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
                    />
                </div>
                <div id="pf3" className="pf w0 h0" data-page-no={3}>
                    <div className="pc pc3 w0 h0">
                        <img
                            className="bi x0 y0 w1 h1 image_layout_3"
                        />
                        <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x1 h2 y2 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
                        <div className="c x4 y37 w2 h6">
                            <div className="t m0 x0 h7 y38 ff3 fs0 fc0 sc0 ls0 ws0">3</div>
                        </div>
                        <div className="c x5 y37 w3 h6">
                            <div className="t m0 x0 h7 y38 ff3 fs0 fc0 sc0 ls0 ws0"> </div>
                        </div>
                        <div className="t m0 x1 h4 y39 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y68 ff3 fs2 fc0 sc0 ls0 ws0">
                            A notar
                            <span className="_ _2" />y public or ot
                            <span className="_ _2" />
                            her officer co
                            <span className="_ _2" />
                            mpleting this ce
                            <span className="_ _2" />
                            rtificate verifi
                            <span className="_ _2" />
                            es only the
                            <span className="_ _2" /> identity of the in
                            <span className="_ _2" />
                            dividual who <span className="_ _2" />
                            signed the{" "}
                        </div>
                        <div className="t m0 x3 h4 y69 ff3 fs2 fc0 sc0 ls0 ws0">
                            docu
                            <span className="_ _2" />
                            ment to which
                            <span className="_ _2" /> this certificate is attac
                            <span className="_ _2" />
                            hed, and
                            <span className="_ _2" /> not the truth
                            <span className="_ _2" />
                            fulness, accu
                            <span className="_ _2" />
                            racy, or valid
                            <span className="_ _2" />
                            ity of that docum
                            <span className="_ _2" />
                            ent.
                        </div>
                        <div className="t m0 x3 h4 y6a ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h5 y6b ff3 fs2 fc0 sc0 ls0 ws0">
                            STATE OF{FillFormData("state", "400px")} 
                            <span className="_ _2" />
                           
                            <span className="_ _2" />
                            <span className="_ _10"> </span>)<span className="_ _2" />
                            <span className="ff2"> </span>
                        </div>
                        <div className="t m0 x3 h4 y6c ff3 fs2 fc0 sc0 ls0 ws0">
                            County o<span className="_ _2" />f {FillFormData("county", "400px")}
                            <span className="_ _2" />
                            <span className="_ _11"> </span>)ss{" "}
                        </div>
                        <div className="t m0 x3 h4 y6d ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y6e ff3 fs2 fc0 sc0 ls0 ws0">
                            On{FillFormData("guarantor_date", "640px")}
                            <span className="_ _2" />
                            
                            <span className="_ _2" />
                           , be
                            <span className="_ _2" />
                            fore me,{FillFormData("name", "580px")}
                            <span className="_ _2" />
                           
                            <span className="_ _2" />
                          , a<span className="_ _2" /> Notary Public,{" "}
                            <span className="_ _2" />
                            personally{" "}
                        </div>
                        <div className="t m0 x3 h4 y6f ff3 fs2 fc0 sc0 ls0 ws0">
                            appear
                            <span className="_ _2" />
                            ed
                            <span className="_ _2" />
                            {FillFormData("state", "430px")}
                           , prov
                            <span className="_ _2" />
                            ed to me on th
                            <span className="_ _2" />e basis of satisfactor
                            <span className="_ _2" />y evid
                            <span className="_ _2" />
                            ence to be the p<span className="_ _2" />
                            erson(s) whose
                            <span className="_ _2" /> names{" "}
                        </div>
                        <div className="t m0 x3 h4 y70 ff3 fs2 fc0 sc0 ls0 ws0">
                            is/are subsc
                            <span className="_ _2" />
                            ribed to <span className="_ _2" />
                            this instrument an
                            <span className="_ _2" />d acknowledge
                            <span className="_ _2" />d to me that he
                            <span className="_ _2" />
                            /she/they e<span className="_ _2" />
                            xecuted it in his/he
                            <span className="_ _2" />
                            r/their auth
                            <span className="_ _2" />
                            orized{" "}
                        </div>
                        <div className="t m0 x3 h4 y71 ff3 fs2 fc0 sc0 ls0 ws0">
                            capacity,
                            <span className="_ _2" /> and that b<span className="_ _2" />y
                            his/her/their
                            <span className="_ _2" /> signature on <span className="_ _2" />
                            the instrument th
                            <span className="_ _2" />e person(s), or t<span className="_ _2" />
                            he entity up
                            <span className="_ _2" />
                            on behalf of w<span className="_ _2" />
                            hich the{" "}
                        </div>
                        <div className="t m0 x3 h4 y72 ff3 fs2 fc0 sc0 ls0 ws0">
                            person
                            <span className="_ _2" />
                            (s) acted, exe
                            <span className="_ _2" />
                            cuted the instru
                            <span className="_ _2" />
                            ment.{" "}
                        </div>
                        <div className="t m0 x3 h4 y73 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y74 ff3 fs2 fc0 sc0 ls0 ws0">
                            I declar
                            <span className="_ _2" />e under PEN
                            <span className="_ _2" />
                            ALTY OF PERJURY un
                            <span className="_ _2" />
                            der the la
                            <span className="_ _2" />
                            ws of the State
                            <span className="_ _2" /> of Californ
                            <span className="_ _2" />
                            ia that the fore
                            <span className="_ _2" />
                            going paragraph
                            <span className="_ _2" /> is true{" "}
                        </div>
                        <div className="t m0 x3 h4 y75 ff3 fs2 fc0 sc0 ls0 ws0">
                            and co
                            <span className="_ _2" />
                            rrect.{" "}
                        </div>
                        <div className="t m0 x3 h4 y76 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y77 ff3 fs2 fc0 sc0 ls0 ws0">
                            WITNESS my
                            <span className="_ _2" /> hand a<span className="_ _2" />
                            nd official seal.{" "}
                        </div>
                        <div className="t m0 x3 h4 y78 ff3 fs2 fc0 sc0 ls0 ws0"> </div>
                        <div className="t m0 x3 h4 y79 ff3 fs2 fc0 sc0 ls0 ws0">
                            {" "}
                            <span className="_ _10"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span>
                            <span className="_ _2" />
                            {FillFormData("guarantor_name", "600px")}
                            <span className="_ _2" />
                           
                            <span className="_ _2" />
                           
                            <span className="_ _2" />
                           {" "}
                        </div>
                        <div className="t m0 x3 h2 y7a ff3 fs2 fc0 sc0 ls0 ws0">
                            {" "}
                            <span className="_ _10"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span> <span className="_ _f"> </span>{" "}
                            <span className="_ _f"> </span>Signatu
                            <span className="_ _2" />
                            re of Notary <span className="_ _2" />
                            Public<span className="ff1 fs0"> </span>
                        </div>
                    </div>
                    <div
                        className="pi"
                        data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
                    />
                </div>
            </div>
            <div className="loading-indicator">
                <img
                    className='image_layout_4'
                    alt=""
                />
            </div>
        </div>
    )
}

export default guarantorAgreement