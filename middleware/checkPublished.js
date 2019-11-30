export default function ({ redirect, params }) {

    moment.locale("ja")

    const diff = Math.abs(moment(params.month, "YYYYMM").diff(moment(), "months"))
    const check = (diff > 0)
    if (!check) {
        console.info(`check:${diff} redirecting`)
        redirect("/?redirect=true");
    }

}