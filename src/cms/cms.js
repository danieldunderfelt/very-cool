import CMS from 'netlify-cms'

import ArticlePreview from './preview-templates/ArticlePreview'
import PagePreview from './preview-templates/PagePreview'

CMS.registerPreviewTemplate('article', ArticlePreview)
CMS.registerPreviewTemplate('page', PagePreview)
