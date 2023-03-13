// standard-version 对 gitlab支持存在问题，详情如下：
// https://github.com/conventional-changelog/standard-version/issues/384
module.exports = {
  "types":[
    {
      "type":"enh",
      "section":"Enhancements"
    },
    {
      "type":"feat",
      "section":"Features"
    },
    {
      "type":"fix",
      "section":"Bug Fixes"
    },
    {
      "type":"test",
      "section":"Tests"
    },
    {
      "type":"build",
      "section":"Build System"
    },
    {
      "type":"ci",
      "hidden":true
    },
    {
      "type":"git",
      "hidden":true
    }
  ],
  "commitUrlFormat": "https://code.lenovows.com/lenovocloud/css/box-develop/develop/fe/atom/portal/commit/{{hash}}",
  "compareUrlFormat": "https://code.lenovows.com/lenovocloud/css/box-develop/develop/fe/atom/portal/compare/{{previousTag}}...{{currentTag}}",
  "issueUrlFormat": "https://code.lenovows.com/lenovocloud/css/box-develop/develop/fe/atom/portal/issues/{{id}}",
  "userUrlFormat": "https://code.lenovows.com/gitlab/{{user}}"
}
