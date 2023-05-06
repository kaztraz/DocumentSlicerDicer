import sys
from pdfminer.high_level import extract_text
from pdfminer.layout import LTTextContainer

def extract_pdf_text_by_page(pdf_file, page_number):
    page_texts = []
    for i, page_layout in enumerate(extract_pages(pdf_file)):
        if i + 1 == page_number:
            for element in page_layout:
                if isinstance(element, LTTextContainer):
                    page_texts.append(element.get_text().strip())
            break
    return " ".join(page_texts)


if __name__ == "__main__":
    pdf_file = sys.argv[1]
    print(extract_pdf_text(pdf_file))
