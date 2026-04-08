"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@/components/ui/Button";
import MonthlyExpensesPdfDocument from "@/components/expenses/MonthlyExpensesPdfDocument";
import type { MonthlyExpenseAnalytics } from "@/types/expense";

type Props = {
  data: MonthlyExpenseAnalytics;
};

function getFileName(data: MonthlyExpenseAnalytics) {
  const month = String(data.month).padStart(2, "0");
  return `budget-sohokari-expenses-${data.year}-${month}.pdf`;
}

export default function MonthlyExpensesPdfDownloadButton({ data }: Props) {
  return (
    <PDFDownloadLink
      document={<MonthlyExpensesPdfDocument data={data} />}
      fileName={getFileName(data)}
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? "Preparing PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
