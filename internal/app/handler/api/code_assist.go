package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CodeAssist(c *gin.Context) {
	var req struct {
		Code     string `json:"code" binding:"required"`
		Language string `json:"language"`
		Question string `json:"question"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: 调用 AI 进行代码分析
	c.JSON(http.StatusOK, gin.H{
		"suggestions": []string{
			"建议1：变量命名可以更清晰",
			"建议2：考虑添加错误处理",
			"建议3：可以使用更高效的算法",
		},
		"analysis": "代码质量良好，但有一些改进空间",
	})
}
