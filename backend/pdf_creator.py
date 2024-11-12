import weasyprint

def makePDF():
    pdf = weasyprint.HTML('http://213.59.156.172:3000/print').write_pdf('request.pdf', optimize_images=True, png_quality=60, dpi=150)

