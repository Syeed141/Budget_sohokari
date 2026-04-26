import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { MonthlyExpenseAnalytics } from "@/types/expense";

type Props = {
  data: MonthlyExpenseAnalytics;
};

function formatBDT(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getMonthName(month: number) {
  return new Date(2000, month - 1, 1).toLocaleString("en-BD", {
    month: "long",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Courier",
    color: "#1A0F00",
    backgroundColor: "#F5EAC8",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#6B5B3E",
    borderBottomStyle: "solid",
  },
  brand: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#6B5B3E",
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 10,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  summaryCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#6B5B3E",
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 9,
    color: "#6B5B3E",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 700,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D8C89A",
    borderBottomStyle: "solid",
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 10,
  },
  insightCard: {
    borderWidth: 1,
    borderColor: "#6B5B3E",
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 9,
    color: "#6B5B3E",
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  insightHelper: {
    fontSize: 9,
    color: "#6B5B3E",
  },
  dailyGroup: {
    borderWidth: 1,
    borderColor: "#6B5B3E",
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dailyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dailyTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  dailyTotal: {
    fontSize: 11,
    fontWeight: 700,
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D8C89A",
    borderBottomStyle: "solid",
  },
  expenseLeft: {
    width: "72%",
  },
  expenseTitle: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 2,
  },
  expenseMeta: {
    fontSize: 9,
    color: "#6B5B3E",
  },
  expenseAmount: {
    width: "25%",
    fontSize: 10,
    textAlign: "right",
    fontWeight: 600,
  },
  footer: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#6B5B3E",
    borderTopStyle: "solid",
    fontSize: 9,
    color: "#6B5B3E",
  },
  emptyText: {
    fontSize: 10,
    color: "#6B5B3E",
  },
});

export default function MonthlyExpensesPdfDocument({ data }: Props) {
  const monthName = getMonthName(data.month);
  const topCategories = data.categoryTotals.slice(0, 5);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>Budget Sohokari</Text>
          <Text style={styles.subtitle}>
            Monthly Expense Report - {monthName} {data.year}
          </Text>
          <Text style={styles.subtitle}>
            Smart budgeting assistant for YOU !
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Monthly Expense</Text>
              <Text style={styles.summaryValue}>
                {formatBDT(data.totalMonthlyExpense)}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Tracked Expense Days</Text>
              <Text style={styles.summaryValue}>{data.dailyGroups.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Insights</Text>
          {data.insights.map((item) => (
            <View key={item.label} style={styles.insightCard}>
              <Text style={styles.insightLabel}>{item.label}</Text>
              <Text style={styles.insightValue}>{item.value}</Text>
              {item.helperText ? (
                <Text style={styles.insightHelper}>{item.helperText}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Categories</Text>

          {topCategories.length === 0 ? (
            <Text style={styles.emptyText}>No category data found for this month.</Text>
          ) : (
            topCategories.map((item) => (
              <View key={item.category} style={styles.categoryRow}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.categoryText}>{formatBDT(item.amount)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Expense Details</Text>

          {data.dailyGroups.length === 0 ? (
            <Text style={styles.emptyText}>No expenses were recorded for this month.</Text>
          ) : (
            data.dailyGroups.map((group) => (
              <View key={group.date} style={styles.dailyGroup}>
                <View style={styles.dailyHeader}>
                  <Text style={styles.dailyTitle}>{formatDate(group.date)}</Text>
                  <Text style={styles.dailyTotal}>{formatBDT(group.total)}</Text>
                </View>

                {group.expenses.map((expense) => (
                  <View key={expense.id} style={styles.expenseRow}>
                    <View style={styles.expenseLeft}>
                      <Text style={styles.expenseTitle}>{expense.title}</Text>
                      <Text style={styles.expenseMeta}>
                        {expense.category}
                        {expense.isFixed ? " - Fixed" : " - Variable"}
                        {expense.note ? ` - ${expense.note}` : ""}
                      </Text>
                    </View>

                    <Text style={styles.expenseAmount}>
                      {formatBDT(expense.amount)}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>

        <Text style={styles.footer}>
          Generated by Budget Sohokari from your monthly expense analytics.
        </Text>
      </Page>
    </Document>
  );
}
