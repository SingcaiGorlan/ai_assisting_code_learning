package plotting

import (
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
)

// CreateLinePlot 创建线性图
func CreateLinePlot(x, y []float64, title, xlabel, ylabel string) (*plot.Plot, error) {
	p := plot.New()
	p.Title.Text = title
	p.X.Label.Text = xlabel
	p.Y.Label.Text = ylabel

	pts := make(plotter.XYs, len(x))
	for i := range x {
		pts[i].X = x[i]
		pts[i].Y = y[i]
	}

	line, err := plotter.NewLine(pts)
	if err != nil {
		return nil, err
	}
	p.Add(line)

	return p, nil
}

// SavePlot 保存图表到文件
func SavePlot(p *plot.Plot, filename string, width, height float64) error {
	return p.Save(vg.Length(width), vg.Length(height), filename)
}