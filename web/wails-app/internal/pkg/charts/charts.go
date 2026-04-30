package charts

import (
	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
)

// CreateBarChart 创建柱状图
func CreateBarChart(xAxis []string, data []opts.BarData) *charts.Bar {
	bar := charts.NewBar()
	bar.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{
			Title:    "数据可视化示例",
			Subtitle: "使用 Go-ECharts",
		}),
	)
	show := true
	bar.SetXAxis(xAxis).
		AddSeries("数据系列", data).
		SetSeriesOptions(charts.WithLabelOpts(opts.Label{
			Show: &show,
		}))
	return bar
}

// CreateLineChart 创建折线图
func CreateLineChart(xAxis []string, yData []opts.LineData) *charts.Line {
	line := charts.NewLine()
	line.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{
			Title:    "趋势分析",
			Subtitle: "使用 Go-ECharts",
		}),
	)
	show := true
	line.SetXAxis(xAxis).
		AddSeries("趋势线", yData).
		SetSeriesOptions(charts.WithLabelOpts(opts.Label{
			Show: &show,
		}))
	return line
}