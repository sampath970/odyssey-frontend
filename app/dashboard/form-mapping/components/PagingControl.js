import { BigButton } from "./BigButton";
import { primary45 } from "../utils/colors";

export default function PagingControl({
  totalPages,
  pageNum,
  setPageNum,
  prevButtonId,
  nextButtonId,
}) {
  const styles = {
    container: {
      marginTop: 8,
      marginBottom: 8,
    },
    inlineFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pageInfo: {
      padding: 8,
      color: primary45,
      fontSize: 14,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.inlineFlex}>
        <BigButton
          id={prevButtonId}
          title={"<"}
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum - 1 === -1}
        />
        <div style={styles.pageInfo}>
          Page: {pageNum + 1}/{totalPages}
        </div>
        <BigButton
          id={nextButtonId}
          title={">"}
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum + 1 > totalPages - 1}
        />
      </div>
    </div>
  );
}
