package dsp

import (
	"gonum.org/v1/gonum/dsp/fourier"
)

// FFT 计算快速傅里叶变换
func FFT(input []float64) []complex128 {
	fft := fourier.NewFFT(len(input))
	return fft.Coefficients(nil, input)
}

// IFFT 计算逆快速傅里叶变换
func IFFT(input []complex128) []float64 {
	ifft := fourier.NewFFT(len(input))
	return ifft.Sequence(nil, input)
}